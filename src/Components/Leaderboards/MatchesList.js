import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const listVariants = {
  hidden: { transition: { staggerChildren: 0.15 } },
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: {
    x: -100,
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2,
      delay: 0.2 + i * 0.05,
    },
  }),
};

const MatchesList = ({ matches }) => {
  return (
    <ul>
      <AnimatePresence>
        {matches.map((match, index) => (
          <motion.li
            key={match.id}
            className="match_box_big"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={index}
          >
            <div className="info_wrapper">
              <div className={`block ${match.resultLocal < match.resultAway ? "lost" : ""}`}>
                <div
                  className="icon"
                  style={{ background: `url(/images/team-icons/${match.localThmb}.svg)` }}
                />
                <div className="team">{match.local}</div>
                <div className="result">{match.resultLocal}</div>
              </div>
              <div className={`block ${match.resultLocal > match.resultAway ? "lost" : ""}`}>
                <div
                  className="icon"
                  style={{ background: `url(/images/team-icons/${match.awayThmb}.svg)` }}
                />
                <div className="team">{match.away}</div>
                <div className="result">{match.resultAway}</div>
              </div>
            </div>
            <div className="info_wrapper nfo">
              <div>
                <strong>Date:</strong>&nbsp;
                {match.date}
              </div>
              <div>
                <strong>Stadium:</strong>&nbsp;
                {match.stadium}
              </div>
              {/* <div>
                <strong>Referee:</strong>&nbsp;
                {match.referee}
              </div> */}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default MatchesList;
