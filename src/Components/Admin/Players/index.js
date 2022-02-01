import React, { useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from "../../../firebase";
import { useEffect } from "react";
import { getDocs, limit, query, startAfter } from "firebase/firestore";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { showToastError } from "../../Utils/Common";
import { Link } from "react-router-dom";

const INITIAL_LOAD_AMMOUNT = 5;
const SUBSEQUENT_LOAD_AMMOUNT = 4;

const AdminPlayers = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoaded, setLastLoaded] = useState(null);
  const [players, setPlayers] = useState(null);

  const requestNextPlayers = (reqLimit, lastLoadedPlayer) => {
    setIsLoading(true);

    const qrParams = [limit(reqLimit)];
    if (lastLoadedPlayer) qrParams.push(startAfter(lastLoadedPlayer));
    const qr = query(playersCollection, ...qrParams);
    getDocs(qr)
      .then(({ docs }) => {
        const lastLoaded = docs[docs.length - 1];
        const newPlayers = docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLastLoaded(lastLoaded);
        if (players === null) setPlayers(newPlayers);
        else setPlayers([...players, ...newPlayers]);
        if (!lastLoaded) {
          setHasMoreData(false);
          showToastError("No further data available");
        }
      })
      .catch((err) => showToastError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (players !== null) return;
    requestNextPlayers(INITIAL_LOAD_AMMOUNT);
  }, [players]);

  const onLoadClick = () => {
    if (lastLoaded === null) {
      showToastError("No data available");
      return;
    }
    requestNextPlayers(SUBSEQUENT_LOAD_AMMOUNT, lastLoaded);
  };

  const renderPlayerRow = ({ id, name, lastname, number, position }) => (
    <TableRow key={id}>
      <TableCell>
        <Link to={`/admin-players/edit-player/${id}`}>{name}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/admin-players/edit-player/${id}`}>{lastname}</Link>
      </TableCell>
      <TableCell>{number}</TableCell>
      <TableCell>{position}</TableCell>
    </TableRow>
  );

  // console.log("Players List: ", players);
  // console.log("Last loaded: ", lastLoaded);

  return (
    <AdminLayout title="The players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          to="/admin-players/add-player"
          LinkComponent={Link}
        >
          Add player
        </Button>
      </div>
      <Paper className="mb-20">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          {players && <TableBody>{players.map((player) => renderPlayerRow(player))}</TableBody>}
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={onLoadClick}
        disabled={isLoading || !hasMoreData}
      >
        Load more
      </Button>
      <div className="admin_progress">
        {isLoading && <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />}
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
