import {
  Button,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getDocs, limit, query, startAfter } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { playersCollection } from "../../../firebase";
import AdminLayout from "../../../Hoc/AdminLayout";
import { showToastError } from "../../Utils/Common";
import SortableColumnTitle from "../SortableColumnTitle";

const INITIAL_LOAD_AMMOUNT = 10;
const SUBSEQUENT_LOAD_AMMOUNT = 7;

const styles = {
  table: {
    ".MuiTableHead-root .MuiTableCell-root": {
      p: 0,
    },
    ".MuiTableBody-root .MuiTableRow-root:hover": {
      backgroundColor: "action.hover",
    },
  },
};

const getSorted = (players, sort) => {
  const [sortProp, desc] = sort?.split(":") ?? [];

  if (sortProp === "number") {
    return players.sort((a, b) => {
      return desc ? b[sortProp] - a[sortProp] : a[sortProp] - b[sortProp];
    });
  } else {
    return players.sort((a, b) => {
      return desc
        ? b[sortProp]?.localeCompare(a[sortProp])
        : a[sortProp]?.localeCompare(b[sortProp]);
    });
  }
};

const AdminPlayers = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoaded, setLastLoaded] = useState(null);
  const [players, setPlayers] = useState(null);
  const [sortedPlayers, setSortedPlayers] = useState([]);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const handleLoadClick = () => {
    if (lastLoaded === null) {
      showToastError("No data available");
      return;
    }
    requestNextPlayers(SUBSEQUENT_LOAD_AMMOUNT, lastLoaded);
  };

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
        else setPlayers((players) => [...players, ...newPlayers]);

        if (newPlayers.length < reqLimit) {
          setHasMoreData(false);
          // showToastError("No further data available");
        }
      })
      .catch((err) => showToastError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (players === null) return;
    setSortedPlayers(getSorted([...players], sort));
  }, [sort, players]);

  useEffect(() => {
    if (players !== null) return;
    requestNextPlayers(INITIAL_LOAD_AMMOUNT);
  }, [players]);

  const renderPlayerRow = ({ id, name, lastname, number, position }) => (
    <TableRow key={id} component={RouterLink} to={`/admin-players/edit-player/${id}`}>
      <TableCell component="div">{name}</TableCell>
      <TableCell component="div">{lastname}</TableCell>
      <TableCell component="div">{number}</TableCell>
      <TableCell component="div">{position}</TableCell>
    </TableRow>
  );

  return (
    <AdminLayout title="The players">
      <div className="mb-8">
        <Button
          disableElevation
          variant="outlined"
          to="/admin-players/add-player"
          LinkComponent={RouterLink}
        >
          Add player
        </Button>
      </div>
      <Paper className="mb-20">
        <Table sx={styles.table} component="div">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="name" disabled={isLoading}>
                  First name
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="lastname" disabled={isLoading}>
                  Last name
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="number" disabled={isLoading}>
                  Number
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="position" disabled={isLoading}>
                  Position
                </SortableColumnTitle>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody component="div">
            {sortedPlayers.map((player) => renderPlayerRow(player))}
          </TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadClick}
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
