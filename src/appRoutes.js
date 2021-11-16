import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Admin/Dashboard";
import Footer from "./Components/Header-Footer/Footer";
import Header from "./Components/Header-Footer/Header";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import { AuthGuard } from "./Hoc/Auth";
import { useStore } from "./Helpers/Store";

const AppRoutes = () => {
  const [state] = useStore();

  console.log(state.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
