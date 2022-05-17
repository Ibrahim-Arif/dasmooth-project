import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateProvider } from "./hooks/useContext";
import { DashboardMenu, SignIn, Welcome } from "./pages";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "antd/dist/antd.min.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [batonsData, setBatonsData] = useState([]);
  const [batons, setBatons] = useState([
    {
      title: "Pending Batons",
      borderColor: null,
      bgColor: null,
    },
    {
      title: "Passed Batons",
      borderColor: "#EFB029",
      bgColor: "#FDF7E6",
    },
    {
      title: "Received Batons",
      borderColor: "#8217B1",
      bgColor: "#F7EFFD",
    },
    {
      title: "Accepted Batons",
      borderColor: "#409000",
      bgColor: "#F4FDF2",
    },
    {
      title: "Complete Batons",
      borderColor: "#196DB2",
      bgColor: "#F2F8FB",
    },
    {
      title: "Declined Batons",
      borderColor: "#EA4400",
      bgColor: "#FDEEE7",
    },
  ]);

  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
  };

  return (
    <StateProvider values={userContextValues}>
      <BrowserRouter>
        {isLoading === false ? (
          <>
            <Routes>
              <Route
                path="/"
                // element={isLogin !== false ? <Navigate to="/" /> : <SignIn />}
                element={<Welcome />}
              />
              <Route
                path="signIn/"
                // element={isLogin !== false ? <Navigate to="/" /> : <SignIn />}
                element={<SignIn />}
              />
              <Route
                path="signIn/:id"
                // element={isLogin !== false ? <Navigate to="/" /> : <SignIn />}
                element={<SignIn />}
              />
              <Route path="/dashboard/*" element={<DashboardMenu />} />
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
