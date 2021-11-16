import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./AppRoutes";
import { initializeFirebase } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StoreProvider, useStore } from "./Helpers/Store";
import { initialState, setUser, userStateReducer } from "./Helpers/userStateReducer";

import "./resources/css/app.css";
import "react-toastify/dist/ReactToastify.css";

initializeFirebase();

const App = ({ children }) => {
  const [, dispatch] = useStore();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setUser(user));
      else dispatch(setUser(null));
    });
  }, [dispatch]);

  return children;
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider reducer={userStateReducer} initialState={initialState}>
      <App>
        <AppRoutes />
      </App>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
