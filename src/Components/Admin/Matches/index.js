import React, { useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { matchesCollection } from "../../../firebase";
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

const AdminMatches = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoaded, setLastLoaded] = useState(null);
  const [matches, setMatches] = useState(null);

  const requestNextMatches = (reqLimit, lastLoadedMatch) => {
    setIsLoading(true);

    const qrParams = [limit(reqLimit)];
    if (lastLoadedMatch) qrParams.push(startAfter(lastLoadedMatch));
    const qr = query(matchesCollection, ...qrParams);
    getDocs(qr)
      .then(({ docs }) => {
        const lastLoaded = docs[docs.length - 1];
        const newMatches = docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLastLoaded(lastLoaded);
        if (matches === null) setMatches(newMatches);
        else setMatches([...matches, ...newMatches]);
        if (!lastLoaded) {
          setHasMoreData(false);
          showToastError("No further data available");
        }
      })
      .catch((err) => showToastError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (matches !== null) return;
    requestNextMatches(INITIAL_LOAD_AMMOUNT);
  }, [matches]);

  const onLoadClick = () => {
    if (lastLoaded === null) {
      showToastError("No data available");
      return;
    }
    requestNextMatches(SUBSEQUENT_LOAD_AMMOUNT, lastLoaded);
  };

  const renderMatchRow = ({ id, date, away, local, resultAway, resultLocal, final }) => (
    <TableRow key={id}>
      <TableCell>
        <Link to={`/admin-matches/edit-match/${id}`}>{date}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/admin-matches/edit-match/${id}`}>
          {away} <strong>-</strong> {local}
        </Link>
      </TableCell>
      <TableCell>
        {resultAway} <strong>-</strong> {resultLocal}
      </TableCell>
      <TableCell>
        {final === "np" ? (
          <span className="matches-tag-green">Not played</span>
        ) : final === "st" ? (
          <span className="matches-tag-red">Final</span>
        ) : (
          <span className="matches-tag-red">
            Final / <span className="tag-uppercase">{final}</span>
          </span>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <AdminLayout title="The matches">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          to="/admin-matches/add-match"
          LinkComponent={Link}
        >
          Add match
        </Button>
      </div>
      <Paper className="mb-20">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          {matches && <TableBody>{matches.map((match) => renderMatchRow(match))}</TableBody>}
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

export default AdminMatches;
