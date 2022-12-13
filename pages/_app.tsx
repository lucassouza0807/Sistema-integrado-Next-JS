import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider, { UserContext } from "../src/contexts/UserContext";
import { useContext } from "react";
import Header from "../components/Header";

export default function App({ session, Component, pageProps }: any) {
  
  return (
    <UserContextProvider>
      <Header />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
