import React from "react";
import Enroll from "./Enroll";
import PromotionAnimation from "./PromotionAnimation";
import Container from "@mui/material/Container";

import "./Promotion.css";

const Promotion = () => {
  return (
    <div className="promotion_wrapper">
      <Container maxWidth="lg">
        <PromotionAnimation />
        <Enroll />
      </Container>
    </div>
  );
};

export default Promotion;
