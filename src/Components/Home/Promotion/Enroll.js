import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import * as Yup from "yup";
import { promotionsCollection } from "../../../firebase";
import { query, where, getDocs, addDoc } from "firebase/firestore";
import { showToastError, showToastSuccess } from "../../Utils/Common";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("The email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async ({ email }) => {
    try {
      const qr = query(promotionsCollection, where("email", "==", email));
      const isOnTheList = await getDocs(qr);

      if (isOnTheList.docs.length > 0) {
        // console.log(`User with email:${email} is already on the list!`);
        showToastError(`Sorry your email is already on the list.`);
        setLoading(false);
        return;
      }

      await addDoc(promotionsCollection, {
        email,
      });
      formik.resetForm();
      setLoading(false);
      showToastSuccess("Congratulations. You have been enlisted.");
    } catch (err) {
      console.error("Error submitting form: ", err);
      showToastError("" + err.message);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.values.email.length > 0 && formik.errors.email && (
              <div className="error_label">{formik.errors.email}</div>
            )}
            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}

            <div className="enroll_discl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quaerat soluta
              sint architecto assumenda doloremque ducimus laborum quibusdam aperiam culpa!
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
