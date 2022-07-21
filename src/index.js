import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./appRoutes";
import { initializeFirebase } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StoreProvider, useStore } from "./Helpers/Store";
import { authFinish, authStart, initialState, userStateReducer } from "./Helpers/userStateReducer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns as DateAdapter } from "@mui/x-date-pickers/AdapterDateFns";
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
    palette: {
      neutral: {
        main: "#424242",
      },
    },
  });

  useEffect(() => {
    const auth = getAuth();
    dispatch(authStart());
    // console.log("Auth start: ", auth);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authFinish(user));
        // console.log("Auth success ");
      } else {
        dispatch(authFinish(null));
        // console.log("Auth failed ");
      }
    });
  }, [dispatch]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider reducer={userStateReducer} initialState={initialState}>
      <LocalizationProvider dateAdapter={DateAdapter} adapterLocale={localeSK}>
        <App>
          <AppRoutes />
        </App>
      </LocalizationProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
