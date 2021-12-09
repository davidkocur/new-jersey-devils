import { motion } from "framer-motion";
import React from "react";
import { enterTransition } from "../../Utils/transitions";

import playerPNG from "../../../resources/images/featured-player.png";

const degToRad = (deg) => deg * (Math.PI / 180);
const degreesToVector = (degs) => {
  const rads = degToRad(degs);
  return { x: Math.cos(rads), y: Math.sin(rads) };
};

const stripeAngle = 20;
const directionVector = degreesToVector(90 + stripeAngle);

const Stripes = () => {
  return (
    <div className="featured_stripes">
      <Stripe
        style={{ top: "-120px", left: "calc(50% - 395px)", backgroundColor: "#ffffff" }}
        startDistance={1200}
        delay={0.5}
        delayChildren={0.4}
        animate="left"
      />
      <Stripe
        style={{ top: "-120px", left: "calc(50% - 115px)", backgroundColor: "#c00" }}
        startDistance={-1200}
        delay={0.7}
        delayChildren={0.2}
        animate="center"
      >
        <ImageSlide
          imgSrc={playerPNG}
          height="700px"
          style={{ marginTop: "270px" }}
          xStart={300}
          xEnd={150}
          animDelay={2}
        />
      </Stripe>
      <Stripe
        style={{ top: "-120px", left: "calc(50% + 165px)", backgroundColor: "#ffffff" }}
        startDistance={1200}
        delay={0.9}
        delayChildren={0}
        animate="right"
      />
    </div>
  );
};

const animStripeWrapper = {
  center: { y: 0, x: 0 },
  left: { y: 0, x: 0 },
  right: { y: 0, x: 0 },
};

const animStripe = {
  center: {
    width: "400px",
    x: -85,
  },
  left: { x: -85 },
  right: { x: 85 },
};

const Stripe = ({ children, style, startDistance, delay, delayChildren, animate }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "1200px",
        overflow: "hidden",
      }}
      variants={animStripeWrapper}
      initial={{ y: directionVector.y * startDistance, x: directionVector.x * startDistance }}
      animate={animate}
      transition={{
        ...enterTransition,
        delay,
        when: "beforeChildren",
        delayChildren: delayChildren,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          height: "1200px",
          ...style,
        }}
        variants={animStripe}
        initial={{ width: "230px", rotate: stripeAngle }}
        transition={enterTransition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const ImageSlide = ({ imgSrc, width, height, style, xStart, xEnd, animDelay }) => {
  return (
    <div style={{ position: "absolute", right: 0, height: "100%", overflow: "hidden" }}>
      <motion.img
        src={imgSrc}
        alt="featured player"
        style={{ objectFit: "contain", ...style }}
        width={width}
        height={height}
        initial={{ rotate: `${-stripeAngle}deg`, x: xStart, opacity: 0 }}
        animate={{
          x: xEnd,
          opacity: 1,
        }}
        transition={{ ...enterTransition, delay: animDelay }}
      />
    </div>
  );
};

export default Stripes;
