import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ imgUrl, fullName, number }) => {
  return (
    <div className="player-card-wrapper">
      <div
        className="player-card-img"
        style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "100% 100%" }}
      />
      <div className="player-card-name">{fullName}</div>
      <div className="player-card-number">{number}</div>
    </div>
  );
};

export default PlayerCard;
