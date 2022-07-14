import { motion } from "framer-motion";
import React from "react";
import Stripes from "./Stripes";
import { enterTransition } from "../../Utils/transitions";

import "./Featured.css";
import { useMediaQuery } from "@mui/material";

const config = (device) => {
  switch (device) {
    case "mobile":
      return { height: "580px", marginTop: "30px" };
    case "tablet":
      return { height: "680px", marginTop: "50px" };
    default:
      return { height: "740px", marginTop: "70px" };
  }
};

const Featured = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isXL = useMediaQuery("(min-width:1440px)");
  // const isTablet = useMediaQuery("(max-width:1024px)");

  const device = isMobile ? "mobile" : isXL ? "large" : "tablet";

  return (
    <div className="featured_wrapper" style={config(device)}>
      <Stripes device={device} />
      <FeaturedButton />
    </div>
  );
};

const FeaturedButton = () => {
  return (
    <div className="featured-button-wrapper">
      <button className="featured-btn">
        <motion.div
          className="featured-btn-bg"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ ...enterTransition, delay: 2.5 }}
        >
          <div className="featured-btn-text">Watch now!</div>
        </motion.div>
      </button>
    </div>
  );
};

export default Featured;
