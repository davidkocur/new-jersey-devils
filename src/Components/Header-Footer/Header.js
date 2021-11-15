import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <div className="header_logo">logo</div>
        </div>
      </Toolbar>
      <ButtonLink name="The team" to="/" />
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
