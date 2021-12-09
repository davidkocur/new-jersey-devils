import React, { useEffect, useState } from "react";
import { matchesCollection } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import Reveal from "react-awesome-reveal";
import { MatchBlock } from "../../Utils/Common";
import { keyframes } from "@mui/styled-engine";

const slideFade = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-200px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (matches.length <= 0) {
      console.log(`Querying collection - ${matchesCollection.path}`);
      getDocs(matchesCollection)
        .then((snapshot) => setMatches(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        .catch((err) => {
          console.error(`There was an error querying ${matchesCollection.path} collection`, err);
        });
    }
  }, []);

  return (
    <div className="home_matches">
      {matches.map((match) => (
        <Reveal key={match.id} className="item" keyframes={slideFade} triggerOnce fraction={0.5}>
          <div>
            <div className="wrapper">
              <MatchBlock match={match} />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default Blocks;
