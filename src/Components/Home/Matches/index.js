import React from "react";
import { TagAnim } from "../../Utils/Animated";
import { Tag } from "../../Utils/Common";
import Blocks from "./Blocks";

import "./Matches.css";

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        {/* <Tag style={{ backgroundColor: "#720000", fontSize: "50px", color: "#ffffff" }}>
          Matches
        </Tag> */}
        <TagAnim
          style={{ backgroundColor: "#720000", fontSize: "50px", color: "#ffffff" }}
          delay={0.3}
        >
          Matches
        </TagAnim>
        <Blocks />
        <Tag linkTo="/the_team" style={{ fontSize: "22px", color: "#0e1731" }}>
          Matches
        </Tag>
      </div>
    </div>
  );
};

export default Matches;
