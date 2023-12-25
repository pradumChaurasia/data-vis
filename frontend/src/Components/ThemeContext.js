// // ThemeContext.js
// import React, { createContext, useContext, useState } from 'react';
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

// const ThemeContext = createContext();

// export const useThemeContext = () => useContext(ThemeContext);

// export const CustomThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? 'dark' : 'light',
//     },
//   });

//   return (
//     <MuiThemeProvider theme={theme}>
//       <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//         {children}
//       </ThemeContext.Provider>
//     </MuiThemeProvider>
//   );
// };

// ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  console.log("Current Theme:", theme); // Add this line for debugging

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  console.log("Theme Context:", context); // Add this line for debugging
  return context;
};

