import React from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "@firebase/auth";
import { toast } from "react-toastify";

import logoImage from "../../resources/images/logos/team-logo.svg";
import "./Common.css";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";

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
  toast.error(message, { position: toast.POSITION.TOP_LEFT });
};

export const showToastSuccess = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_LEFT });
};

export const Tag = ({ children, linkTo, style }) => {
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
    >
      {children}
    </div>
  );

  return linkTo ? <Link to={linkTo}>{template}</Link> : template;
};

export const MatchBlock = ({ match }) => {
  return (
    <div className="match_block">
      <div className="match_date">
        {match.date}
        <span className="thin-line" />
        <span className="thin-line" />
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div
              className="icon"
              style={{ background: `url(/images/team-icons/${match.localThmb}.svg)` }}
            />
            <div className="team_name">{match.local}</div>
          </div>
          <div className="right">{match.final ? match.resultLocal : "-"}</div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div
              className="icon"
              style={{ background: `url(/images/team-icons/${match.awayThmb}.svg)` }}
            />
            <div className="team_name">{match.away}</div>
          </div>
          <div className="right">{match.final ? match.resultAway : "-"}</div>
        </div>
      </div>
    </div>
  );
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

export const useDebouncedInput = ({ defaultText = "", debounceTime = 1000 }) => {
  const [text, setText] = useState(defaultText);
  const [t, setT] = useState(null);

  const onChange = (text) => {
    if (t) clearTimeout(t);
    setT(setTimeout(() => setText(text), debounceTime));
  };

  return [text, onChange];
};
