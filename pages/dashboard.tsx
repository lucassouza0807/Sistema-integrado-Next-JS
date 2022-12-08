import { useContext, createContext, useState, useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {
    console.log(window.localStorage.getItem("user"));
  }, [])
  
  return <>sds</>;
}
