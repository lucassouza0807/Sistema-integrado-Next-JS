import { useState, createContext } from "react";

export type userThemeType = {
  theme: string;
  backgroundColor: string;
  textColor: string;
};

export const UserTheme = createContext({});

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<userThemeType>({
    theme: "light",
    backgroundColor: "#dedede",
    textColor: "black",
  });

  return (
    <UserTheme.Provider value={{ theme, setTheme }}>
      {children}
    </UserTheme.Provider>
  );
}
