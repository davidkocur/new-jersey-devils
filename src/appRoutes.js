import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Admin/Dashboard";
import AdminPlayers from "./Components/Admin/Players";
import AddEditPlayers from "./Components/Admin/Players/AddEditPlayers";
import AdminMatches from "./Components/Admin/Matches";
import AddEditMatch from "./Components/Admin/Matches/AddEditMatch";
import Footer from "./Components/Header-Footer/Footer";
import Header from "./Components/Header-Footer/Header";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import Team from "./Components/Team";
import { AuthGuard } from "./Hoc/Auth";
import Leaderboards from "./Components/Leaderboards";
import NotFound from "./Components/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin-players/add-player"
          element={
            <AuthGuard>
              <AddEditPlayers />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-players/edit-player/:playerid"
          element={
            <AuthGuard>
              <AddEditPlayers />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-players"
          element={
            <AuthGuard>
              <AdminPlayers />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-matches/add-match"
          element={
            <AuthGuard>
              <AddEditMatch />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-matches/edit-match/:matchid"
          element={
            <AuthGuard>
              <AddEditMatch />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-matches"
          element={
            <AuthGuard>
              <AdminMatches />
            </AuthGuard>
          }
        />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/the-team" element={<Team />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
