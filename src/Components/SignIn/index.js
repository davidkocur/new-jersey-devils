import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { useNavigate, Navigate } from "react-router";
import { useStore } from "../../Helpers/Store";
import { showToastError, showToastSuccess } from "../Utils/Common";

import "./SignIn.css";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [state] = useStore();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "test@gmail.com",
      password: "12345678",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("The email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must have at least 6 characters"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showToastSuccess("Welcome back!");
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        showToastError("" + err.message);
      });
  };

  return !state.user ? (
    <div className="container">
      <div className="signin_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <h2>Plaese login</h2>
          <input
            name="email"
            placeholder="Email"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error_label">{formik.errors.email}</div>
          ) : null}
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error_label">{formik.errors.password}</div>
          ) : null}

          {loading ? (
            <CircularProgress color="secondary" className="progress" />
          ) : (
            <button type="submit">Log in</button>
          )}
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default SignIn;
