import React, { useReducer, useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { matchesCollection } from "../../../firebase";
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
import { Link, useSearchParams } from "react-router-dom";
import SortableColumnTitle from "../SortableColumnTitle";
import { format } from "date-fns";

const INITIAL_LOAD_AMMOUNT = 10;
const SUBSEQUENT_LOAD_AMMOUNT = 7;

const numSort = (a, b, prop, desc) => {
  return desc ? a[prop] - b[prop] : b[prop] - a[prop];
};

const numSort2 = (a, b, propA, propB, desc) => {
  return desc ? a[propB] - b[propA] : b[propA] - a[propB];
};

const matchStateSort = (a, b, desc) => {
  const aPts = a.final === "st" ? 4 : a.final === "ot" ? 3 : a.final === "so" ? 2 : 1;
  const bPts = b.final === "st" ? 4 : b.final === "ot" ? 3 : b.final === "so" ? 2 : 1;

  return desc ? aPts - bPts : bPts - aPts;
};

const strSort2 = (a, b, propA, propB, desc) => {
  return desc ? b[propB]?.localeCompare(a[propA]) : a[propA]?.localeCompare(b[propB]);
};

const sortingReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "date": {
      const newSort = [...payload.matches].sort((a, b) => numSort(a, b, "timestamp", payload.desc));

      return { sortedMatches: newSort };
    }
    case "match": {
      const newSort = [...payload.matches].sort((a, b) => {
        const propA = a.home ? "away" : "local";
        const propB = b.home ? "away" : "local";
        return strSort2(a, b, propA, propB, payload.desc);
      });

      return { sortedMatches: newSort };
    }
    case "result": {
      const newSort = [...payload.matches].sort((a, b) => {
        const propA = a.home ? "resultLocal" : "resultAway";
        const propB = b.home ? "resultLocal" : "resultAway";
        return numSort2(a, b, propA, propB, payload.desc);
      });

      return { sortedMatches: newSort };
    }
    case "state": {
      const newSort = [...payload.matches].sort((a, b) => matchStateSort(a, b, payload.desc));

      return { sortedMatches: newSort };
    }
    case undefined: {
      return { sortedMatches: payload.matches };
    }
    default:
      return state;
  }
};

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

const AdminMatches = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoaded, setLastLoaded] = useState(null);
  const [matches, setMatches] = useState(null);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const [sortState, dispatch] = useReducer(sortingReducer, {
    sortedMatches: [],
  });

  const requestNextMatches = (reqLimit, lastLoadedMatch) => {
    setIsLoading(true);

    const qrParams = [limit(reqLimit)];
    if (lastLoadedMatch) qrParams.push(startAfter(lastLoadedMatch));
    const qr = query(matchesCollection, ...qrParams);
    getDocs(qr)
      .then(({ docs }) => {
        const lastLoaded = docs[docs.length - 1];
        const newMatches = docs.map((doc) => {
          const date = new Date(doc.get("date"));

          return {
            ...doc.data(),
            id: doc.id,
            timestamp: date.getTime(),
            readableDate: format(date, "dd MMM RRRR"),
          };
        });
        setLastLoaded(lastLoaded);
        if (matches === null) setMatches(newMatches);
        else setMatches([...matches, ...newMatches]);
        if (newMatches.length < reqLimit) {
          setHasMoreData(false);
          // showToastError("No further data available");
        }
      })
      .catch((err) => showToastError(err))
      .finally(() => setIsLoading(false));
  };

  const onLoadClick = () => {
    if (lastLoaded === null) {
      showToastError("No data available");
      return;
    }
    requestNextMatches(SUBSEQUENT_LOAD_AMMOUNT, lastLoaded);
  };

  useEffect(() => {
    if (matches === null) return;

    const [sortProp, desc] = sort?.split(":") ?? [];

    dispatch({
      type: sortProp,
      payload: { desc: desc ? true : false, matches },
    });
  }, [sort, matches]);

  useEffect(() => {
    if (matches !== null) return;
    requestNextMatches(INITIAL_LOAD_AMMOUNT);
  }, [matches]);

  const renderMatchRow = ({ id, readableDate, away, local, resultAway, resultLocal, final }) => (
    <TableRow key={id} component={Link} to={`/admin-matches/edit-match/${id}`}>
      <TableCell component={"div"}>{readableDate}</TableCell>
      <TableCell component={"div"}>
        {away} <strong>-</strong> {local}
      </TableCell>
      <TableCell component={"div"}>
        {resultAway} <strong>-</strong> {resultLocal}
      </TableCell>
      <TableCell component={"div"}>
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
        <Table sx={styles.table} component="div">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="date" disabled={isLoading}>
                  Date
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="match" disabled={isLoading}>
                  Match
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="result" disabled={isLoading}>
                  Result
                </SortableColumnTitle>
              </TableCell>
              <TableCell component="div">
                <SortableColumnTitle sort={sort} columnName="state" disabled={isLoading}>
                  State
                </SortableColumnTitle>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {sortState.sortedMatches.map((match) => renderMatchRow(match))}
          </TableBody>
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
