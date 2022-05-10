import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const { isLogin, setIsLogin } = useContext(UserContext);

  return {
    isLogin,
    setIsLogin,
  };
};

export const StateProvider = ({ values, children }) => {
  const { isLogin, setIsLogin } = values;

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
