import { createContext, ReactNode, useState } from "react";

export type UserContextProps = {
  children: ReactNode;
};

export type UserContextType = {
  user: any[];
  setUser: (newState: any) => {};
};

const initialValue = {
  user: {
    isLogged: false,
    user_info : ""
  },
  setIsLogged: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState(initialValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
};
