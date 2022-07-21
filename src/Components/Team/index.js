import { CircularProgress } from "@mui/material";
import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { playersCollection } from "../../firebase";
import { showToastError } from "../Utils/Common";
import { PlayerCardLarge } from "../Utils/PlayerCard";
import { fadeInLeft } from "../Utils/revealAnimations";

import "./Team.css";

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (players.length < 1) {
      getDocs(playersCollection)
        .then((snapshot) => {
          setPlayers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch(() => showToastError("Sorry try again later"))
        .finally(() => setLoading(false));
    }
  }, [players]);

  const renderCategory = (category) =>
    players
      .filter((player) => player.position === category)
      .map((player) => (
        <Reveal
          key={player.id}
          keyframes={fadeInLeft(200)}
          style={{ boxSizing: "border-box", maxWidth: "100%" }}
          triggerOnce
        >
          <div className="item">
            <PlayerCardLarge
              number={player.number}
              name={player.name}
              lastName={player.lastname}
              imgUrl={player.imageURL}
            />
          </div>
        </Reveal>
      ));
  return (
    <div className="full_height_wrapper  the_team_container">
      {loading ? (
        <div className="progress_full">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Forwards</div>
            <div className="team_cards">{renderCategory("Forwards")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Defense</div>
            <div className="team_cards">{renderCategory("Defense")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Goalies</div>
            <div className="team_cards">{renderCategory("Goalie")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
