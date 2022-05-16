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

  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
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
