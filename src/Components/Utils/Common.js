import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "@firebase/auth";
import { toast } from "react-toastify";

import logoImage from "../../resources/images/logos/team-logo.svg";
import "./Common.css";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { differenceInCalendarDays, format, isPast } from "date-fns";

/*=============================
         COMPONENTS
===============================*/

export const TeamLogo = ({ linkTo, width, height }) => {
  const template = (
    <div
      className="img_cover"
      style={{ width, height, background: `url(${logoImage}) no-repeat` }}
    ></div>
  );

  return linkTo ? <Link to={linkTo}>{template}</Link> : <div>{template}</div>;
};

export const showToastError = (message) => {
  toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
};

export const showToastSuccess = (message) => {
  toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
};

export const Tag = ({ children, linkTo, style, className }) => {
  const template = (
    <div
      style={{
        backgroundColor: "#fff",
        fontSize: "15px",
        color: "#000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Exo",
        fontWeight: "900",
        ...style,
      }}
      className={className || ""}
    >
      {children}
    </div>
  );

  return linkTo ? <Link to={linkTo}>{template}</Link> : template;
};

export const MatchBlock = ({ match }) => {
  return (
    <div className="match-block">
      <div className="match-head">
        <div className="match-date">
          {formatMatchDate(match.date)}
          <span className="thin-line" />
          <span className="thin-line" />
        </div>
        {!match.played && <div className="upcomming">upcomming</div>}
      </div>
      <div className="match-wrapper">
        <div className="match-top">
          <div className="left">
            <div
              className="icon"
              style={{ background: `url(/images/team-icons/${match.localThmb}.svg)` }}
            />
            <div className="team-name">{match.local}</div>
          </div>
          <div className="right">{match.played ? match.resultLocal : "-"}</div>
        </div>
        <div className="match-bottom">
          <div className="left">
            <div
              className="icon"
              style={{ background: `url(/images/team-icons/${match.awayThmb}.svg)` }}
            />
            <div className="team-name">{match.away}</div>
          </div>
          <div className="right">{match.played ? match.resultAway : "-"}</div>
        </div>
      </div>
    </div>
  );
};

export const TextFieldDebounced = ({ onChange, ...rest }) => {
  const inputRef = useRef(null);
  const debounceOnChange = useCallback(debounceV2(onChange, 700), [debounceV2]);

  useEffect(() => {
    const currentRef = inputRef.current;
    currentRef.addEventListener("input", debounceOnChange);
    return () => {
      if (currentRef) currentRef.removeEventListener("input", debounceOnChange);
    };
  }, [inputRef, debounceOnChange]);

  return <TextField ref={inputRef} {...rest} />;
};

export const TextFieldDebounced2 = ({ onChange, error, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);

  const debounceOnChange = useCallback(debounceV2(onChange, 700), [debounceV2]);
  const blurInput = useCallback(() => setTouched(true), [setTouched]);

  useEffect(() => {
    const currentRef = inputRef.current;

    currentRef.addEventListener("input", debounceOnChange);
    currentRef.addEventListener("blur", blurInput);
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("input", debounceOnChange);
        currentRef.removeEventListener("blur", blurInput);
      }
    };
  }, [inputRef, debounceOnChange, blurInput]);

  return <TextField ref={inputRef} error={touched && error} helperText={error} {...rest} />;
};

/*=============================
         FUNCTIONS
===============================*/

export const logoutHandler = (onSuccess) => {
  signOut(getAuth())
    .then(() => {
      showToastSuccess("See ya!");
      onSuccess();
    })
    .catch((err) => {
      showToastError("" + err.message);
    });
};

export const formikTextErrorHelper = (formik, value) => ({
  error: formik.errors[value] && formik.touched[value],
  helperText: formik.errors[value],
});

export const formikSelectErrorHelper = (formik, value) => {
  return (
    formik.errors[value] &&
    formik.touched[value] && <FormHelperText>{formik.errors[value]}</FormHelperText>
  );
};

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function debounceV2(callback, wait = 500, immediate) {
  let timeout;

  return (...args) => {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
}

export function sortMatchesByDate(matchA, matchB) {
  return Math.sign(matchB.date.getTime() - matchA.date.getTime());
}

export function sortMatchesByDateDesc(matchA, matchB) {
  return Math.sign(matchA.date.getTime() - matchB.date.getTime());
}

export function formatMatchDate(date) {
  const isPastDate = isPast(date);
  const difference = isPastDate
    ? differenceInCalendarDays(new Date(), date)
    : differenceInCalendarDays(date, new Date());

  if (difference < 1) return "Today at 20:00";
  else if (difference < 2) return isPastDate ? "Yesterday" : "Tomorrow at 19:00";
  else if (difference < 7 && !isPastDate) return format(date, "d MMM yy (eeee)");
  else return format(date, "d MMM yyyy");
}
