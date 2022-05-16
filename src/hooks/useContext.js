import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const { isLogin, setIsLogin, batonsData, setBatonsData } =
    useContext(UserContext);

  return {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
  };
};

export const StateProvider = ({ values, children }) => {
  const { isLogin, setIsLogin, batonsData, setBatonsData } = values;

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        batonsData,
        setBatonsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
