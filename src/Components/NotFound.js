import SadFace from "@mui/icons-material/SentimentDissatisfied";
import React from "react";

const NotFound = () => {
  return (
    <div className="full_height_wrapper">
      <div className="not_found_container">
        <h1>Sorry</h1>
        <SadFace />
        <p>We cannot seem to find this page.</p>
      </div>
    </div>
  );
};

export default NotFound;
