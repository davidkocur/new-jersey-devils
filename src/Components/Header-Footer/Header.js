import { AppBar, Button, Toolbar } from "@mui/material";
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
      <div className="header_logo">
        <TeamLogo linkTo={"/"} width="58px" height="58px" />
        <h1>New Jersey Devils</h1>
      </div>
      <Toolbar style={{ display: "flex", minHeight: "unset", backgroundColor: "#b40000" }}>
        <ButtonLink name="The team" to="/the_team" />
        <ButtonLink name="Matches" to="/the_matches" />
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
      </Toolbar>
    </AppBar>
  );
};

const ButtonLink = ({ name, to }) => {
  return (
    <Link to={to}>
      <Button color="inherit" disableElevation>
        {name}
      </Button>
    </Link>
  );
};

export default Header;
