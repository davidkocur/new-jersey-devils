import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { enterTransition } from "../../Utils/transitions";

import playerPNG from "../../../resources/images/featured-player.png";
import { debounce } from "../../Utils/Common";
import { useMediaQuery } from "@mui/material";

const degToRad = (deg) => deg * (Math.PI / 180);
const degreesToVector = (degs) => {
  const rads = degToRad(degs);
  return { x: Math.cos(rads), y: Math.sin(rads) };
};

const stripeAngle = 20;
const directionVector = degreesToVector(90 + stripeAngle);

const sizeConfig = (device) => {
  switch (device) {
    case "mobile":
      return {
        width: 160,
        xMargin: 50,
        growWidth: 280,
        xAnimOffset: 50,
        height: 480,
        marginTop: 220,
      };
    case "tablet":
      return {
        width: 180,
        xMargin: 40,
        growWidth: 320,
        xAnimOffset: 70,
        height: 580,
        marginTop: 250,
      };
    default:
      return {
        width: 180,
        xMargin: 40,
        growWidth: 360,
        xAnimOffset: 90,
        height: 640,
        marginTop: 260,
      };
  }
};

const Stripes = ({ device }) => {
  const config = sizeConfig(device);

  console.log(`New config: ${device}`, config);

  return (
    <div className="featured_stripes">
      <Stripe
        style={{
          top: "-120px",
          left: `calc(50% - ${config.width * 1.5 + config.xMargin}px)`,
          backgroundColor: "#ffffff",
        }}
        config={config}
        startDistance={1200}
        delay={0.5}
        delayChildren={0.4}
        animate="left"
      />
      <Stripe
        style={{
          top: "-120px",
          left: `calc(50% - ${config.width * 0.5}px)`,
          backgroundColor: "#c00",
        }}
        config={config}
        startDistance={-1200}
        delay={0.7}
        delayChildren={0.2}
        animate="center"
      >
        <ImageSlide
          imgSrc={playerPNG}
          height={`${config.height}px`}
          style={{ marginTop: `${config.marginTop}px` }}
          xStart={300}
          xEnd={150}
          animDelay={2}
        />
      </Stripe>
      <Stripe
        style={{
          top: "-120px",
          left: `calc(50% + ${config.width * 0.5 + config.xMargin}px)`,
          backgroundColor: "#ffffff",
        }}
        config={config}
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

const Stripe = ({ children, style, config, startDistance, delay, delayChildren, animate }) => {
  /*  TODO: New values in the config, don't change the animation.
   *        - add a custom prop to motion.div with config inside.
   *        - than turn the variants object into a function
   */

  const animStripe = {
    center: {
      width: config.growWidth + "px",
      x: -config.xAnimOffset,
    },
    left: { x: -config.xAnimOffset },
    right: { x: config.xAnimOffset },
  };

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
        initial={{ width: config.width, rotate: stripeAngle }}
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
