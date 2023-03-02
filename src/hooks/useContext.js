import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
    isDraftModalVisible,
    setIsDraftModalVisible,
  } = useContext(UserContext);

  return {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
    isDraftModalVisible,
    setIsDraftModalVisible,
  };
};

export const StateProvider = ({ values, children }) => {
  const {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
    isDraftModalVisible,
    setIsDraftModalVisible,
  } = values;

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        batonsData,
        setBatonsData,
        batons,
        setBatons,
        teamMembers,
        setTeamMembers,
        permanentData,
        setPermanentData,
        notifications,
        setNotifications,
        photoURL,
        setPhotoURL,
        isDraftModalVisible,
        setIsDraftModalVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
