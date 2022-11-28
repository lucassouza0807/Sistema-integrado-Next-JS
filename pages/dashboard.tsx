import { useContext, createContext, useState, useEffect } from "react";
import { UserContext, UserContextType } from "./contexts/UserProvider";

export default function Dashboard() {
  const { user, setUser } = useContext<UserContextType>(UserContext);

  useEffect(() => {
    console.log(window.localStorage.getItem("user"));
  }, [])
  
  console.log(user);
  return <>sds</>;
}
