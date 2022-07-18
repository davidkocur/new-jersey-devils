import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./appRoutes";
import { initializeFirebase } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StoreProvider, useStore } from "./Helpers/Store";
import { initialState, setUser, userStateReducer } from "./Helpers/userStateReducer";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import localeSK from "date-fns/locale/sk";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";

initializeFirebase();

const App = ({ children }) => {
  const [, dispatch] = useStore();

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
      },
    },
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setUser(user));
      else dispatch(setUser(null));
    });
  }, [dispatch]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider reducer={userStateReducer} initialState={initialState}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={localeSK}>
        <App>
          <AppRoutes />
        </App>
      </LocalizationProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
