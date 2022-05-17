import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const { isLogin, setIsLogin, batonsData, setBatonsData, batons, setBatons } =
    useContext(UserContext);

  return {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
  };
};

export const StateProvider = ({ values, children }) => {
  const { isLogin, setIsLogin, batonsData, setBatonsData, batons, setBatons } =
    values;

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        batonsData,
        setBatonsData,
        batons,
        setBatons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
