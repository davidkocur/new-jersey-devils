import { Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from "@mui/material";

import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { positionsCollection } from "../../firebase";
import { showToastError } from "../Utils/Common";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    transition: {
      opacity: { ease: "easeOut", duration: 0.3 },
      x: { ease: "easeOut", duration: 0.3 },
    },
    transitionEnd: {
      visibility: "hidden",
    },
  },
  visible: {
    visibility: "visible",
    opacity: 1,
    x: 0,
    transition: {
      opacity: { ease: "easeOut", duration: 0.3 },
      x: { ease: "easeOut", duration: 0.3 },
    },
  },
  static: {
    visibility: "visible",
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const LeagueTable = ({ isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const isTablet = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    if (positions.length < 1) {
      console.log("load table");
      setLoading(true);

      getDocs(positionsCollection)
        .then((snapshot) => {
          const tempPositions = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          tempPositions.sort((teamA, teamB) => teamA.p - teamB.p);
          setPositions(tempPositions);
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  }, [positions]);

  const renderPositions = () =>
    positions.map((pos, i) => (
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{pos.team}</TableCell>
        <TableCell>{pos.w}</TableCell>
        <TableCell>{pos.l}</TableCell>
        <TableCell>{pos.ot}</TableCell>
        <TableCell>{pos.pts}</TableCell>
      </TableRow>
    ));

  return (
    <motion.div
      className="league_table_wrapper"
      variants={tableVariants}
      initial={false}
      animate={!isTablet ? "static" : isOpen ? "visible" : "hidden"}
    >
      <h3 className="title">League Table</h3>
      <div className="table-body">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>OT</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{!loading && renderPositions()}</TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default LeagueTable;
