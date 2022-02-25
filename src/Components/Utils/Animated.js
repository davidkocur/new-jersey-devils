import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addObservedElement, removeObservedElement } from "../../Helpers/InViewportHelper";

const tagAnimations = {
  fgHidden: {
    x: "-100%",
  },
  fgVisible: (delay) => ({
    x: [null, "0%", "0%", "100%"],
    transition: {
      delay: delay,
      duration: 0.6,
      times: [0, 0.45, 0.55, 1],
      ease: "easeInOut",
    },
  }),
  textHidden: {
    visibility: "hidden",
    fontWeight: "inherit",
  },
  textVisible: (delay) => ({
    visibility: "visible",
    transition: {
      delay: delay + 0.3,
    },
  }),
};

export const TagAnim = ({ children, linkTo, className, style, animStyle, delay }) => {
  const containerRef = useRef(null);
  const [isInViewport, setInViewport] = useState(false);
  useEffect(() => {
    const elementID = addObservedElement(containerRef.current, () => {
      console.log(`ID ${containerRef.current.id} is in viewport!`);
      setInViewport(true);
      removeObservedElement(elementID);
    });
  }, []);

  const template = (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        padding: "5px 10px",
        color: "#000",
        backgroundColor: "#fff",
        fontFamily: "Exo",
        fontSize: "15px",
        overflow: "hidden",
        ...style,
      }}
      className={className || ""}
      ref={containerRef}
    >
      <motion.h3
        initial={tagAnimations.textHidden}
        animate={isInViewport && tagAnimations.textVisible}
        custom={delay || 0}
      >
        {children}
      </motion.h3>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          zIndex: 1,
          ...animStyle,
        }}
        initial={tagAnimations.fgHidden}
        animate={isInViewport && tagAnimations.fgVisible}
        custom={delay || 0}
      />
    </div>
  );

  return linkTo ? <Link to={linkTo}>{template}</Link> : template;
};
