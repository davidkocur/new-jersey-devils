import { CircularProgress, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getDocs } from "firebase/firestore";
import React, { useEffect, useState, useReducer } from "react";
import { matchesCollection } from "../../firebase";
import { showToastError, sortMatchesByDate } from "../Utils/Common";
import LeagueTable from "./LeagueTable";
import MatchesList from "./MatchesList";

import "./Leaderboards.css";

const playedFilters = [
  { title: "All", value: "all" },
  { title: "Played", value: "yes" },
  { title: "Not Played", value: "no" },
];

const resultFilters = [
  { title: "All", value: "all" },
  { title: "W", value: "w" },
  { title: "L", value: "l" },
];

const Leaderboards = () => {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [state, dispatch] = useReducer((prevState, nextState) => ({ ...prevState, ...nextState }), {
    filteredMatches: matches,
    playedFilter: "all",
    resultFilter: "all",
  });

  useEffect(() => {
    if (matches.length < 1) {
      console.log("load matches");
      setLoading(true);

      getDocs(matchesCollection)
        .then((snapshot) => {
          const tempMatches = snapshot.docs
            .map((doc) => {
              const theData = doc.data();
              return { ...theData, id: doc.id, date: new Date(theData.date) };
            })
            .sort(sortMatchesByDate);

          setMatches(tempMatches);
          dispatch({ ...state, filteredMatches: tempMatches });
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  }, [matches, state]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const setPlayedFilter = (playedFilter) => {
    const cond = playedFilter === "yes";
    const list = matches.filter((match) => match.played === cond);
    dispatch({
      ...state,
      filteredMatches: playedFilter === "all" ? matches : list,
      playedFilter,
      resultFilter: "all",
    });
  };

  const setResultFilter = (resultFilter) => {
    const list = matches.filter((match) => match.result === resultFilter);
    dispatch({
      ...state,
      filteredMatches: resultFilter === "all" ? matches : list,
      playedFilter: "all",
      resultFilter,
    });
  };

  const renderFilterOption = (isPlayedFilter, filterObj, key) => {
    const isActive = isPlayedFilter
      ? state.playedFilter === filterObj.value
      : state.resultFilter === filterObj.value;

    return (
      <div
        key={key}
        className={`option ${isActive ? "active" : ""}`}
        onClick={() =>
          isPlayedFilter ? setPlayedFilter(filterObj.value) : setResultFilter(filterObj.value)
        }
      >
        {filterObj.title}
      </div>
    );
  };

  return (
    <div className="full_height_wrapper">
      {loading ? (
        <div className="progress_full">
          <CircularProgress />
        </div>
      ) : (
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <h5 className="tag">Filter Matches</h5>
                <div className="cont">
                  {playedFilters.map((filter, index) => renderFilterOption(true, filter, index))}
                </div>
              </div>
              <div className="match_filters_box">
                <h5 className="tag">Filter Results</h5>
                <div className="cont">
                  {resultFilters.map((filter, index) => renderFilterOption(false, filter, index))}
                </div>
              </div>
            </div>
            {matches.length > 0 && <MatchesList matches={state.filteredMatches} />}
          </div>
          <div className="right" style={{ pointerEvents: drawerOpen ? "auto" : "none" }}>
            <IconButton aria-label="open table" onClick={toggleDrawer}>
              <MenuIcon fontSize="medium" />
            </IconButton>
            <LeagueTable isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboards;
