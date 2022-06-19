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
import { handleGetTeamMembers } from "./services";

initializeApp(firebaseConfig);
const auth = getAuth();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [batons, setBatons] = useState([
    {
      title: "Pending Batons",
      borderColor: null,
      bgColor: null,
      status: "pending",
    },
    {
      title: "Passed Batons",
      borderColor: "#EFB029",
      bgColor: "#FDF7E6",
      status: "passed",
    },
    {
      title: "Received Batons",
      borderColor: "#8217B1",
      bgColor: "#F7EFFD",
      status: "received",
    },
    {
      title: "Accepted Batons",
      borderColor: "#409000",
      bgColor: "#F4FDF2",
      status: "accepted",
    },
    {
      title: "Complete Batons",
      borderColor: "#196DB2",
      bgColor: "#F2F8FB",
      status: "complete",
    },
    {
      title: "Declined Batons",
      borderColor: "#EA4400",
      bgColor: "#FDEEE7",
      status: "declined",
    },
  ]);

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
    if (user) {
      setIsLogin(user);
    }
  });
  useEffect(() => {
    if (isLogin) {
      handleGetTeamMembers(auth.currentUser.uid, setTeamMembers);
    }
  }, [isLogin]);

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
