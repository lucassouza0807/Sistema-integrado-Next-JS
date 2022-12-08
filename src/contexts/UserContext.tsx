import { createContext, useState } from "react";

type userContextType = {
  isAuthenticated: boolean;
};

export const userContext = createContext({} as userContextType);

export default function AuthProvider({ chidren }: any) {
  const isAuthenticated = false;

  return (
    <userContext.Provider value={isAuthenticated}>
      {chidren}
    </userContext.Provider>
  );
}
