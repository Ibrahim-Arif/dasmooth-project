import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { StateProvider } from "./hooks/useContext";
import {
  DashboardMenu,
  SignIn,
  Welcome,
  ForgotPassword,
  VerifyEmail,
  Invite,
  SignUp,
} from "./pages";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "antd/dist/antd.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import {
  handleGetMyBatons,
  handleGetNotifications,
  handleGetOtherBatons,
  handleGetTeamMembers,
} from "./services";
import { batonsList } from "./utilities/batonsList";
import SplashScreen from "./pages/SplashScreen";

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [permanentData, setPermanentData] = useState([]);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [batons, setBatons] = useState({ ...batonsList });
  const [myBatons, setMyBatons] = useState([]);
  const [otherBatons, setOtherBatons] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showSplashScreen, setShowSplshScreen] = useState(true);
  const [isInviteLink, setIsInviteLink] = useState(false);

  const flushStates = () => {
    setPermanentData([]);
    setBatonsData([]);
    setMyBatons([]);
    setOtherBatons([]);
    setTeamMembers([]);
    setNotifications([]);
    setIsLogin(false);
    setLoading(false);
    setPhotoURL("");
  };

  const auth = getAuth(app);

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
    photoURL,
    setPhotoURL,
    isInviteLink,
    setIsInviteLink,
  };

  useEffect(() => {
    if (isLogin) {
      setPhotoURL(isLogin.photoURL);
      handleGetTeamMembers(isLogin.uid, setTeamMembers);
      handleGetMyBatons(isLogin.uid, myBatons, setMyBatons);
      handleGetOtherBatons(isLogin.uid, otherBatons, setOtherBatons);
      handleGetNotifications(isLogin.uid, setNotifications);
    } else {
      flushStates();
    }
  }, [isLogin]);

  useEffect(() => {
    // console.log("batonsData useEffect, App.js", batonsData);
    let temp = [...myBatons, ...otherBatons];
    console.log(myBatons, otherBatons);
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
    // console.log("Permanent:", permanentData);
  }, [JSON.stringify(myBatons), JSON.stringify(otherBatons)]);

  useEffect(() => {
    setBatonsData([...permanentData]);
  }, [JSON.stringify(permanentData)]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        if (!window.location.pathname.includes("/signup/")) {
          setIsLogin(user);
        } else {
          auth.signOut().then(() => {
            flushStates();
          });
        }
        setShowSplshScreen(false);
      } else {
        setShowSplshScreen(false);
      }
    });
  }, []);

  return (
    <StateProvider values={userContextValues}>
      <BrowserRouter>
        <>
          <Routes>
            {showSplashScreen ? (
              <Route path="*" element={<SplashScreen />} />
            ) : isLogin == false ? (
              <>
                <Route path="" element={<Welcome />} />
                {/* <Route path="invite/:inviteId" element={<Invite />} /> */}
                <Route path="signIn/:id" element={<SignIn />} />
                <Route path="signUp/:id" element={<SignUp />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="verifyEmail" element={<VerifyEmail />} />
                <Route path="forgotpassword" element={<ForgotPassword />} />
                <Route path="*" element={<SignIn />} />
              </>
            ) : (
              <Route path="*" element={<DashboardMenu />} />
            )}
          </Routes>
        </>
      </BrowserRouter>
    </StateProvider>
  );
};

export default App;
