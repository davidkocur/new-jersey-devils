import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useStore } from "../../Helpers/Store";
import { logoutHandler, TeamLogo } from "../Utils/Common";

import "./Header-Footer.css";

const Header = () => {
  const [state] = useStore();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#C00",
        boxShadow: "none",
      }}
    >
      <div className="header-logo">
        <TeamLogo linkTo={"/"} width="100%" height="100%" />
        <h1>New Jersey Devils</h1>
      </div>
      <Toolbar
        style={{
          display: "flex",
          minHeight: "unset",
          backgroundColor: "#b40000",
          justifyContent: "space-between",
        }}
      >
        <div className="left">
          <ButtonLink name="The team" to="/the-team" style={{ flex: "1 1 auto" }} />
          <ButtonLink name="Matches" to="/leaderboards" style={{ flex: "1 1 auto" }} />
        </div>

        <div className="right">
          {!state.user && <ButtonLink name="Log In" to="/sign-in" />}
          {state.user && (
            <>
              <ButtonLink name="Dashboard" to="/dashboard" />
              <Button
                color="inherit"
                disableElevation
                onClick={() => logoutHandler(() => navigate("/sign-in", { replace: true }))}
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const ButtonLink = ({ name, to, style }) => {
  return (
    <Link to={to} style={style}>
      <Button color="inherit" disableElevation>
        {name}
      </Button>
    </Link>
  );
};

export default Header;
