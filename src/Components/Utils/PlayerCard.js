import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ imgUrl, name, lastName, number }) => {
  return (
    <div className="player-card-wrapper">
      <div className="player-card-img-wrapper">
        <div
          className="player-card-img"
          style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "100% 100%" }}
        />
      </div>
      <div className="player-card-name">
        <span className="first-name">{name}</span>&nbsp;
        <span className="last-name">{lastName}</span>
      </div>
      <div className="player-card-number">{number}</div>
    </div>
  );
};

export const PlayerCardLarge = ({ imgUrl, name, lastName, number }) => {
  return (
    <div className="player-card-lg-wrapper">
      <div className="player-card-lg-img-wrapper">
        <div
          className="player-card-img"
          style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "100% 100%" }}
        />
        <h4 className="player-card-lg-number">#{number}</h4>
      </div>
      <div className="player-card-content-wrapper">
        <h5>{name}</h5>
        <h3>{lastName}</h3>
      </div>
    </div>
  );
};

export default PlayerCard;
