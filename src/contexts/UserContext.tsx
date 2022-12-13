import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useUser } from "../hooks/useRehydrate";

export type UserContextType = {
  isLogged: boolean;
  user: string[];
};

export const UserContext = createContext({});

export default function UserContextProvider({ children }: any) {
  const { token } = parseCookies();

  let isLogged = !!token;

  const [user, setUser] = useState<UserContextType | null>({
    isLogged: isLogged,
    user: [],
  });

  useEffect(() => {
    useUser().then((response) => {
      setUser({
        isLogged: true,
        user: response.data
      })
    });
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
