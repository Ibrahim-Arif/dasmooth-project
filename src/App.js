import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { StateProvider } from "./hooks/useContext";
import {
  DashboardMenu,
  SignIn,
  Welcome,
  ForgotPassword,
  VerifyEmail,
} from "./pages";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "antd/dist/antd.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  handleGetMyBatons,
  handleGetNotifications,
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
  const [permanentData, setPermanentData] = useState([]);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [batons, setBatons] = useState({ ...batonsList });
  const [myBatons, setMyBatons] = useState([]);
  const [otherBatons, setOtherBatons] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData: batonsData,
    setBatonsData: setBatonsData,
    permanentData,
    setPermanentData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    notifications,
    setNotifications,
  };

  onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid");
    if (uid != null && user.uid == uid && user.emailVerified) {
      setIsLogin(user);
    } else {
    }
  });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    console.log("Login UID:", isLogin.uid);
    console.log("Local UID", uid);
    console.log(isLogin);
    if (isLogin) {
      handleGetTeamMembers(isLogin.uid, setTeamMembers);
      handleGetMyBatons(isLogin.uid, myBatons, setMyBatons);
      handleGetOtherBatons(isLogin.uid, otherBatons, setOtherBatons);
      handleGetNotifications(uid, setNotifications);
    } else {
      setPermanentData([]);
      setBatonsData([]);
      setMyBatons([]);
      setOtherBatons([]);
      setTeamMembers([]);
      setNotifications([]);
    }
  }, [isLogin]);

  useEffect(() => {
    // console.log("batonsData useEffect, App.js", batonsData);
    let temp = [...myBatons, ...otherBatons];
    // temp = [...new Set(temp)]
    const filteredArr = temp.reduce((acc, current) => {
      const x = acc.find((item) => item.docId === current.docId);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setPermanentData(filteredArr);
    console.log("Permanent:", permanentData);
  }, [myBatons, otherBatons]);

  useEffect(() => {
    setBatonsData([...permanentData]);
  }, [permanentData]);
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
                  <Route path="verifyEmail" element={<VerifyEmail />} />
                  <Route path="forgotpassword" element={<ForgotPassword />} />
                  <Route path="/*" element={<SignIn />} />
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
