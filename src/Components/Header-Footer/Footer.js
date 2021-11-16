import React from "react";
import { TeamLogo } from "../Utils/Common";

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <TeamLogo linkTo={"/"} width="70px" height="70px" />
      </div>
      <div className="footer_copyright">Manchester city 2021. All rights reserved</div>
    </footer>
  );
};

export default Footer;
