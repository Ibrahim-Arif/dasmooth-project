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
import { handleGetBatons, handleGetTeamMembers } from "./services";
import { batonsList } from "./utilities/batonsList";

initializeApp(firebaseConfig);
const auth = getAuth();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [batons, setBatons] = useState(batonsList);

  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
  };

  onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid");
    if (user.uid == uid) {
      setIsLogin(user);
    }
  });

  useEffect(() => {
    // console.log(isLogin);
    if (isLogin) {
      handleGetTeamMembers(auth.currentUser.uid, setTeamMembers);
      handleGetBatons(auth.currentUser.uid,setBatonsData)
    }
  }, [isLogin]);

  useEffect(()=>{console.log("batonsData useEffect, App.js",batonsData)},[batonsData])
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
