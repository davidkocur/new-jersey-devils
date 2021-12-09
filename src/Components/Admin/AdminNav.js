import { ListItemButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../Utils/Common";

const links = [
  { title: "Matches", to: "/admin-matches" },
  { title: "Players", to: "/admin-players" },
];

const AdminNav = () => {
  const navigate = useNavigate();

  const renderLinks = () =>
    links.map((link) => (
      <Link to={link.to} key={link.title}>
        <ListItemButton className="admin_nav_link">{link.title}</ListItemButton>
      </Link>
    ));

  return (
    <div>
      {renderLinks()}
      <ListItemButton
        className="admin_nav_link"
        onClick={() => logoutHandler(() => navigate("/sign-in", { replace: true }))}
      >
        Log out
      </ListItemButton>
    </div>
  );
};

export default AdminNav;
