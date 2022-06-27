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
    permanentData,setPermanentData
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
    permanentData,setPermanentData
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
    permanentData,setPermanentData
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
        permanentData,setPermanentData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
