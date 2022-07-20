import React, { useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from "../../../firebase";
import { useEffect } from "react";
import { getDocs, limit, query, startAfter } from "firebase/firestore";
import {
  Link,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { showToastError } from "../../Utils/Common";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

const INITIAL_LOAD_AMMOUNT = 10;
const SUBSEQUENT_LOAD_AMMOUNT = 7;

const styles = {
  table: {
    ".MuiTableHead-root .MuiTableCell-root": {
      p: 0,
    },
  },
};

const AdminPlayers = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoaded, setLastLoaded] = useState(null);
  const [players, setPlayers] = useState(null);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const [sortProp, desc] = sort?.split(":") ?? [];

  const sortPlayers = (a, b) => {
    return desc ? b[sortProp]?.localeCompare(a[sortProp]) : a[sortProp]?.localeCompare(b[sortProp]);
  };

  const sortedPlayers = [...(players ?? [])].sort(sortPlayers);

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

  const renderPlayerRow = ({ id, name, lastname, number, position }) => (
    <TableRow key={id}>
      <TableCell>
        <RouterLink to={`/admin-players/edit-player/${id}`}>{name}</RouterLink>
      </TableCell>
      <TableCell>
        <RouterLink to={`/admin-players/edit-player/${id}`}>{lastname}</RouterLink>
      </TableCell>
      <TableCell>{number}</TableCell>
      <TableCell>{position}</TableCell>
    </TableRow>
  );

  return (
    <AdminLayout title="The players">
      <div className="mb-8">
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
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <SortableColumnTitle sort={sort} columnName="name" disabled={isLoading}>
                  First name
                </SortableColumnTitle>
              </TableCell>
              <TableCell>
                <SortableColumnTitle sort={sort} columnName="lastname" disabled={isLoading}>
                  Last name
                </SortableColumnTitle>
              </TableCell>
              <TableCell>
                {/* <SortableColumnTitle sort={sort} columnName="number" disabled={isLoading}>
                  Number
                </SortableColumnTitle> */}
                Number
              </TableCell>
              <TableCell>
                <SortableColumnTitle sort={sort} columnName="position" disabled={isLoading}>
                  Position
                </SortableColumnTitle>
              </TableCell>
            </TableRow>
          </TableHead>
          {sortedPlayers && (
            <TableBody>{sortedPlayers.map((player) => renderPlayerRow(player))}</TableBody>
          )}
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

const SortableColumnTitle = ({ children, sort, columnName, disabled }) => {
  const [sortProp, desc] = sort?.split(":") ?? [];

  const style = {
    px: 2,
    py: 1.4,
    borderRadius: "0",
    textTransform: "none",
    ".MuiButton-endIcon": {
      visibility: sortProp === columnName ? "visible" : "hidden",
    },
  };

  return (
    <Link
      to={
        sortProp !== columnName ? `?sort=${columnName}` : !desc ? `?sort=${columnName}:desc` : "./"
      }
      component={RouterLink}
    >
      <Button
        variant="text"
        color={sortProp === columnName ? "primary" : "neutral"}
        disabled={disabled}
        sx={style}
        endIcon={desc ? <ArrowDropDown fontSize="large" /> : <ArrowDropUp fontSize="large" />}
      >
        {children}
      </Button>
    </Link>
  );
};

export default AdminPlayers;
