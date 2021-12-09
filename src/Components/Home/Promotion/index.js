import React from "react";
import Enroll from "./Enroll";
import PromotionAnimation from "./PromotionAnimation";

import "./Promotion.css";

const Promotion = () => {
  return (
    <div className="promotion_wrapper">
      <div className="container">
        <PromotionAnimation />
        <Enroll />
      </div>
    </div>
  );
};

export default Promotion;
