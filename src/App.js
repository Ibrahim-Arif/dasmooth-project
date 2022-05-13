import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateProvider } from "./hooks/useContext";
import {  DashboardMenu, SignIn } from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "antd/dist/antd.min.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const userContextValues = {
    isLogin,
    setIsLogin,
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
