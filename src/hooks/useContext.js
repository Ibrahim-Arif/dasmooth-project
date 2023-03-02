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
    drawerClickedItem,
    setDrawerClickedItem,
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
    drawerClickedItem,
    setDrawerClickedItem,
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
    drawerClickedItem,
    setDrawerClickedItem,
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
        drawerClickedItem,
        setDrawerClickedItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
