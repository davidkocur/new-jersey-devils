import React from "react";

import TatarJPG from "../../../resources/images/players/tatar.jpg";
import ZachaJPG from "../../../resources/images/players/zacha.jpg";
import MercerJPG from "../../../resources/images/players/mercer.jpg";
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
    name: "Dawson",
    lastName: "Mercer",
    number: "#18",
    image: MercerJPG,
  },
  {
    name: "Christian",
    lastName: "Jaros",
    number: "#83",
    image: JarosJPG,
  },
];

const Leaderboard = ({}) => {
  return (
    <ul className="home-leaderboard-wrapper">
      {featuredPlayers.map((player, index) => (
        <li key={"plr" + index}>
          <PlayerCard
            imgUrl={player.image}
            fullName={player.name + " " + player.lastName}
            number={player.number}
          />
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
