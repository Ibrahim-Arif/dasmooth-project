import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateProvider } from "./hooks/useContext";
import { DashboardMenu, SignIn, Welcome } from "./pages";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "antd/dist/antd.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  handleGetMyBatons,
  handleGetOtherBatons,
  handleGetTeamMembers,
} from "./services";
import { batonsList } from "./utilities/batonsList";
import { generateNotification } from "./utilities/generateNotification";

initializeApp(firebaseConfig);
const auth = getAuth();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [permanentData,setPermanentData] = useState([])
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [batons, setBatons] = useState({ ...batonsList });
  const [myBatons, setMyBatons] = useState([]);
  const [otherBatons, setOtherBatons] = useState([]);

  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData: batonsData,
    setBatonsData: setBatonsData,
    permanentData,setPermanentData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
  };

  onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid");
    if (uid != null && user.uid == uid && user.emailVerified) {
      setIsLogin(user);
    }
  });

  useEffect(() => {
    // console.log(isLogin);
 
      if (isLogin) {
        handleGetTeamMembers(isLogin.uid, setTeamMembers);
        handleGetMyBatons(isLogin.uid, myBatons, setMyBatons);
        handleGetOtherBatons(isLogin.uid, otherBatons, setOtherBatons);
      } else {
        setPermanentData([])
        setBatonsData([]);
        setMyBatons([]);
        setOtherBatons([]);
      }
    
  }, [isLogin]);

  useEffect(() => {
    // console.log("batonsData useEffect, App.js", batonsData);
    let temp = [...myBatons, ...otherBatons];
    setPermanentData([...new Set(temp)]);
  
  }, [myBatons, otherBatons]);
  
  useEffect(() => {setBatonsData([...permanentData])}, [permanentData]);
  return (
    <StateProvider values={userContextValues}>
      <BrowserRouter>
        {isLoading === false ? (
          <>
            <Routes>
              {isLogin == false ? (
                <>
                  <Route path="/" element={<Welcome />} />
                  <Route path="signIn/" element={<SignIn />} />
                  <Route path="signIn/:id" element={<SignIn />} />
                </>
              ) : (

                <Route path="/*" element={<DashboardMenu />} />
              )}
              {/*  <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </>
        ) : // <Loading />
        null}
      </BrowserRouter>
    </StateProvider>
  );
};

export default App;
