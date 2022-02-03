import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

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
  const getDateFormat = (date) => {
    const matchDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deltaMillis = matchDate - today;
    const dayInMillis = 86400000 - 1;

    if (Math.abs(deltaMillis) < dayInMillis) return "Today at 20:00";
    else if (Math.abs(deltaMillis) < dayInMillis * 2)
      return deltaMillis < 0 ? "Yesterday" : "Tomorrow at 19:00";
    else if (Math.abs(deltaMillis) < dayInMillis * 6)
      return deltaMillis < 0
        ? format(matchDate, "d MMM yyyy")
        : format(matchDate, "d MMM yy (eeee)");
    else return format(matchDate, "d MMM yyyy");
  };

  const renderFinalText = (finalCode) => {
    switch (finalCode) {
      case "st":
        return <p className={`final ${finalCode}`}>Final</p>;
      case "ot":
        return (
          <p className={`final ${finalCode}`}>
            Final
            <br />
            <span>Overtime</span>
          </p>
        );
      case "so":
        return (
          <p className={`final ${finalCode}`}>
            Final
            <br />
            <span>Shootout</span>
          </p>
        );
      default:
        return <p className={`final ${finalCode}`}>Upcomming</p>;
    }
  };

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
            <div className="results_wrapper">
              <div className={`block ${match.resultLocal < match.resultAway ? "lost" : ""}`}>
                <div
                  className="icon"
                  style={{ background: `url(/images/team-icons/${match.localThmb}.svg)` }}
                />
                <div className="team">{match.local}</div>
                <div className="result">{match.played ? match.resultLocal : "-"}</div>
              </div>
              <div className={`block ${match.resultLocal > match.resultAway ? "lost" : ""}`}>
                <div
                  className="icon"
                  style={{ background: `url(/images/team-icons/${match.awayThmb}.svg)` }}
                />
                <div className="team">{match.away}</div>
                <div className="result">{match.played ? match.resultAway : "-"}</div>
              </div>
            </div>
            <div className="final-wrapper">{renderFinalText(match.final)}</div>
            <div className="details">
              <div>
                Date:&nbsp;
                <strong>{getDateFormat(match.date)}</strong>
              </div>
              <div>
                Stadium:&nbsp;
                <strong>{match.stadium}</strong>
              </div>
              <div>
                W:&nbsp;
                <strong>{match.bestWinning}</strong>
              </div>
              <div>
                L:&nbsp;
                <strong>{match.bestLosing}</strong>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default MatchesList;
