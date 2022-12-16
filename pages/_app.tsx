import "../styles/globals.css";
import UserContextProvider, { UserContext } from "../src/contexts/UserContext";
import ThemeProvider from "../src/contexts/UserTheme";
import Header from "./components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserContextProvider>
        <Header />
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  );
}
