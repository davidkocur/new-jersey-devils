import { motion } from "framer-motion";
import React from "react";
import OtamendiPNG from "../../../resources/images/players/Otamendi.png";
import SterlingPNG from "../../../resources/images/players/Sterling.png";
import KompanyPNG from "../../../resources/images/players/Kompany.png";
import PlayerCardOld from "../../Utils/PlayerCardOld";
import { enterTransition } from "../../Utils/transitions";

const featuredCards = [
  {
    name: "Vincent",
    lastName: "Kompany",
    number: "28",
    image: KompanyPNG,
    variants: {
      start: { x: 0, y: 0 },
      end: { x: 100, y: -50 },
    },
  },
  {
    name: "Raheem",
    lastName: "Sterling",
    number: "29",
    image: SterlingPNG,
    variants: {
      start: { x: 0, y: 0 },
      end: { x: 16.67, y: -8.33 },
    },
  },
  {
    name: "Nicolas",
    lastName: "Otamendi",
    number: "30",
    image: OtamendiPNG,
    variants: {
      start: { x: 0, y: 0 },
      end: { x: -66.67, y: 33.33 },
    },
  },
  {
    name: "Vincent",
    lastName: "Kompany",
    number: "28",
    image: KompanyPNG,
    variants: {
      start: { x: 0, y: 0 },
      end: { x: -150, y: 75 },
    },
  },
];

const Cards = ({ doAnimation }) => {
  return (
    <motion.div initial="start" animate={doAnimation && "end"}>
      {featuredCards.map((card, index) => (
        <motion.div
          key={"plrCard" + index}
          style={{ position: "absolute", left: "150px", bottom: "75px" }}
          variants={card.variants}
          transition={{ ...enterTransition, delay: 0.85 }}
        >
          <PlayerCardOld {...card} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Cards;
