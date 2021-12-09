import React from "react";
import { TeamLogo } from "../Utils/Common";

const Footer = () => {
  return (
    <footer className="bck_black">
      <div className="footer_logo">
        <TeamLogo linkTo={"/"} width="70px" height="70px" />
      </div>
      <div className="footer_copyright">
        Copyright © 2022 New Jersey Devils. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
