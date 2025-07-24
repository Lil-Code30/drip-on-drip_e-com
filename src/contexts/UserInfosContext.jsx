import { createContext, useContext, useEffect, useState } from "react";

const UserInfosContext = createContext();

export function UserProvider({ children }) {
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem("userInfos")) || {}
  );

  const handleUser = (user) => {
    setUserInfos(user);
  };

  useEffect(() => {
    localStorage.setItem("userInfos", JSON.stringify(userInfos));
  }, [userInfos]);

  return (
    <UserInfosContext.Provider value={{ userInfos, handleUser }}>
      {children}
    </UserInfosContext.Provider>
  );
}

export const useUser = () => useContext(UserInfosContext);
