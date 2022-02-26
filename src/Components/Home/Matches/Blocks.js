import React, { useEffect, useState } from "react";
import { matchesCollection } from "../../../firebase";
import { getDocs, limit, query } from "firebase/firestore";
import Reveal from "react-awesome-reveal";
import { MatchBlock, sortMatchesByDate, sortMatchesByDateDesc } from "../../Utils/Common";
import { fadeInLeft } from "../../Utils/revealAnimations";
import { useMediaQuery } from "@mui/material";

const Blocks = () => {
  const [matches, setMatches] = useState([]);
  const [slice, setSlice] = useState([]);
  const isTablet = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (matches.length <= 0) {
      // console.log(`Querying collection - ${matchesCollection.path}`);
      const q = query(matchesCollection, limit(10));
      getDocs(q)
        .then((snapshot) => {
          const today = Date.now();
          const tempMatches = snapshot.docs
            .map((doc) => {
              const theData = doc.data();
              return { ...theData, id: doc.id, date: new Date(theData.date) };
            })
            .sort((matchA, matchB) => {
              if (matchA.date.getTime() > today && matchA.date.getTime() > today)
                return sortMatchesByDateDesc(matchA, matchB);
              else return sortMatchesByDate(matchA, matchB);
            });
          const maxSize = tempMatches.length > 5 ? 5 : tempMatches.length;
          setSlice(tempMatches.slice(0, maxSize));

          setMatches(tempMatches);
        })
        .catch((err) => {
          console.error(`There was an error querying ${matchesCollection.path} collection`, err);
        });
    }
  }, []);

  return (
    <div className="home_matches">
      {isTablet
        ? slice.map((match) => (
            <Reveal
              key={match.id}
              className="item"
              keyframes={fadeInLeft(200)}
              triggerOnce
              fraction={0.5}
            >
              <div className="wrapper">
                <MatchBlock match={match} />
              </div>
            </Reveal>
          ))
        : matches.map((match) => (
            <Reveal
              key={match.id}
              className="item"
              keyframes={fadeInLeft(200)}
              triggerOnce
              fraction={0.5}
            >
              <div className="wrapper">
                <MatchBlock match={match} />
              </div>
            </Reveal>
          ))}
    </div>
  );
};

export default Blocks;
