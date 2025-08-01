import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const UserInfosContext = createContext();

export function UserProvider({ children }) {
  const queryClient = useQueryClient();
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem("userInfos")) || {}
  );

  const handleUser = (user) => {
    setUserInfos(user);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["profile", "addresses"] });
    localStorage.setItem("userInfos", JSON.stringify(userInfos));
  }, [userInfos, queryClient]);

  return (
    <UserInfosContext.Provider value={{ userInfos, handleUser }}>
      {children}
    </UserInfosContext.Provider>
  );
}

export const useUser = () => useContext(UserInfosContext);
