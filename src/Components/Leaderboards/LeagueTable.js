import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { positionsCollection } from "../../firebase";
import { showToastError } from "../Utils/Common";

const LeagueTable = () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (positions.length < 1) {
      setLoading(true);

      getDocs(positionsCollection)
        .then((snapshot) => {
          setPositions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
        <TableCell>{pos.d}</TableCell>
        <TableCell>{pos.pts}</TableCell>
      </TableRow>
    ));

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
