import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import logoImage from "../../resources/images/logos/manchester_city_logo.png";

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
