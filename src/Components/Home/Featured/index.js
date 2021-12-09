import { motion } from "framer-motion";
import React from "react";
import Stripes from "./Stripes";
import { enterTransition } from "../../Utils/transitions";

import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured_wrapper">
      <Stripes />
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
