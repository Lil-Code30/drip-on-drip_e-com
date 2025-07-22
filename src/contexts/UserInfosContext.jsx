import { createContext, useContext } from "react";

const UserInfosContext = createContext();

export function UserProvider({ children }) {
  const userInfos = JSON.parse(localStorage.getItem("userInfos")) || {};

  return (
    <UserInfosContext.Provider value={{ userInfos }}>
      {children}
    </UserInfosContext.Provider>
  );
}

export const useUser = () => useContext(UserInfosContext);
