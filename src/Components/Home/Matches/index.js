import { Container } from "@mui/material";
import React from "react";
import { TagAnim } from "../../Utils/Animated";
import { Tag } from "../../Utils/Common";
import Blocks from "./Blocks";

import "./Matches.css";

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <Container maxWidth="lg">
        <TagAnim
          style={{ backgroundColor: "#720000", fontSize: "50px", color: "#ffffff" }}
          delay={0.3}
        >
          Matches
        </TagAnim>
        <Blocks />
        <Tag linkTo="/leaderboards" style={{ fontSize: "22px", color: "#0e1731" }}>
          Matches
        </Tag>
      </Container>
    </div>
  );
};

export default Matches;
