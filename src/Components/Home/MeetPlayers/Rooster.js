import React from "react";

import TatarJPG from "../../../resources/images/players/tatar.jpg";
import ZachaJPG from "../../../resources/images/players/zacha.jpg";
import StudenicJPG from "../../../resources/images/players/studenic.jpg";
import JarosJPG from "../../../resources/images/players/jaros.jpg";
import PlayerCard from "../../Utils/PlayerCard";

const featuredPlayers = [
  {
    name: "Tomas",
    lastName: "Tatar",
    number: "#90",
    image: TatarJPG,
  },
  {
    name: "Pavel",
    lastName: "Zacha",
    number: "#37",
    image: ZachaJPG,
  },
  {
    name: "Marian",
    lastName: "Studenic",
    number: "#18",
    image: StudenicJPG,
  },
  {
    name: "Christian",
    lastName: "Jaros",
    number: "#83",
    image: JarosJPG,
  },
];

const Leaderboard = () => {
  return (
    <ul className="home-leaderboard-wrapper">
      {featuredPlayers.map((player, index) => (
        <li key={"plr" + index}>
          <PlayerCard
            imgUrl={player.image}
            name={player.name}
            lastName={player.lastName}
            number={player.number}
          />
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
