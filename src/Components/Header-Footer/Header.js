import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useStore } from "../../Helpers/Store";
import { signOut, getAuth } from "@firebase/auth";
import { setUser } from "../../Helpers/userStateReducer";

import { showToastError, showToastSuccess, TeamLogo } from "../Utils/Common";

const Header = () => {
  const [state, dispatch] = useStore();
  const navigate = useNavigate();

  const logoutHandler = () => {
    signOut(getAuth())
      .then(() => {
        showToastSuccess("See ya!");
        // dispatch(setUser(null));
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        showToastError("" + err.message);
      });
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#98c5e9",
        boxShadow: "none",
        padding: "10px 0",
        borderBottom: "2px solid #00285e",
      }}
    >
      <Toolbar style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <TeamLogo linkTo={"/"} width="70px" height="70px" />
          </div>
        </div>
        <ButtonLink name="The team" to="/the_team" />
        <ButtonLink name="Matches" to="/the_matches" />
        {state.user && (
          <>
            <ButtonLink name="Dashboard" to="/dashboard" />
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const ButtonLink = ({ name, to }) => {
  return (
    <Link to={to}>
      <Button color="inherit">{name}</Button>
    </Link>
  );
};

export default Header;
