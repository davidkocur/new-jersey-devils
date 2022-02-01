import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";
import {
  formikSelectErrorHelper,
  formikTextErrorHelper,
  showToastError,
  showToastSuccess,
} from "../../Utils/Common";
import { getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { teamsCollection, matchesCollection } from "../../../firebase";

const defaultFormValues = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  resultAway: "",
  stadium: "",
  result: "",
  final: "",
};

const messages = {
  required: "This input is required",
  wrongNumber: "Please enter valid number",
};

const AddEditMatch = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [teams, setTeams] = useState([]);

  const [matchDocRef, setMatchDocRef] = useState(null);

  const { matchid } = useParams();
  const navigate = useNavigate();

  const submitForm = (values) => {
    const dataToSubmit = values;
    teams.forEach((team) => {
      if (values.away === team.shortName) dataToSubmit.awayThmb = team.thmb;
      if (values.local === team.shortName) dataToSubmit.localThmb = team.thmb;
    });
    dataToSubmit.played = values.final !== "np";

    if (values.away === values.local) {
      showToastError("You can't have same team on both sides !");
      return;
    }
    if (values.final !== "np" && values.resultLocal === values.resultAway) {
      showToastError("The teams can't have equal score !");
      return;
    }

    setLoading(true);
    if (matchid) {
      updateDoc(matchDocRef, dataToSubmit)
        .then(() => {
          showToastSuccess("Match was updated");
          navigate("../admin-matches", { replace: true });
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    } else {
      addDoc(matchesCollection, dataToSubmit)
        .then(() => {
          showToastSuccess("Match was added");
          navigate("../admin-matches", { replace: true });
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: Yup.object({
      date: Yup.string().required(messages.required),
      local: Yup.string().required(messages.required),
      resultLocal: Yup.number()
        .required(messages.required)
        .min(0, messages.wrongNumber)
        .max(99, messages.wrongNumber),
      away: Yup.string().required(messages.required),
      resultAway: Yup.number()
        .required(messages.required)
        .min(0, messages.wrongNumber)
        .max(99, messages.wrongNumber),
      stadium: Yup.string().required(messages.required),
      result: Yup.mixed().required(messages.required).oneOf(["w", "l", "n/a"]),
      final: Yup.mixed().required(messages.required).oneOf(["st", "ot", "so", "np"]),
    }),
    onSubmit: submitForm,
  });

  const renderTeams = () =>
    teams.map((team) => (
      <MenuItem value={team.shortName} key={team.id}>
        {team.shortName}
      </MenuItem>
    ));

  const onDateChanged = (e) => {
    const { value } = e.target;

    if (new Date(value).getTime() > Date.now()) {
      formik.setFieldValue("result", "n/a");
      formik.setFieldValue("final", "np");
      formik.setFieldValue("resultLocal", 0);
      formik.setFieldValue("resultAway", 0);
    } else {
      if (formik.values.result === "n/a") formik.setFieldValue("result", "");
      if (formik.values.final === "np") formik.setFieldValue("final", "");
    }
  };

  const onRemoveClick = () => setDialogOpen(true);

  const handleRemoveDialogClose = () => setDialogOpen(false);

  const handleRemoveDialogConfirm = () => {
    setDialogOpen(false);
    setLoading(true);
    deleteDoc(matchDocRef)
      .then(() => {
        showToastSuccess("Match was successfully deleted");
        navigate("../admin-matches", { replace: true });
      })
      .catch((err) => showToastError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const side = formik.values.local === "Devils" ? 1 : formik.values.away === "Devils" ? -1 : 0;
    const result = Math.sign(formik.values.resultLocal - formik.values.resultAway);
    if (result === 0 || side === 0) return;

    console.log(`Effect: ${side} ${result}`);

    if (side === result) formik.setFieldValue("result", "w");
    else formik.setFieldValue("result", "l");
  }, [
    formik.values.resultAway,
    formik.values.resultLocal,
    formik.values.away,
    formik.values.local,
    formik.setFieldValue,
  ]);

  useEffect(() => {
    if (teams.length < 1) {
      setLoading(true);
      getDocs(teamsCollection)
        .then((snapshot) => setTeams(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  }, [teams]);

  useEffect(() => {
    if (matchid) {
      //WE ARE EDITING
      setLoading(true);

      const docRef = doc(matchesCollection.firestore, matchesCollection.path, matchid);

      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            showToastError(`Sorry, the match with id ${matchid}, was not found`);
            navigate("../admin-matches", { replace: true });
            return;
          }
          setMatchDocRef(docRef);
          setFormValues(snapshot.data());
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  }, [matchid]);

  return (
    <AdminLayout title={matchid ? "Edit match" : "Add match"}>
      <div className="editmatch_dialog_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h4>Select date</h4>
            <FormControl className="mb-5" onChange={onDateChanged}>
              <TextField
                id="date"
                name="date"
                type="date"
                variant="outlined"
                {...formik.getFieldProps("date")}
                {...formikTextErrorHelper(formik, "date")}
              />
            </FormControl>
          </div>
          <hr />

          <div>
            <h4>Result local</h4>
            <FormControl error={formik.errors.local && formik.touched.local}>
              <Select
                id="local"
                name="local"
                variant="outlined"
                displayEmpty
                {...formik.getFieldProps("local")}
              >
                <MenuItem value="" disabled>
                  Select a team
                </MenuItem>
                {renderTeams()}
              </Select>
              {formikSelectErrorHelper(formik, "local")}
            </FormControl>
            <FormControl style={{ marginLeft: "10px" }}>
              <TextField
                id="resultLocal"
                name="resultLocal"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("resultLocal")}
                {...formikTextErrorHelper(formik, "resultLocal")}
              />
            </FormControl>
          </div>

          <div>
            <h4>Result away</h4>
            <FormControl error={formik.errors.away && formik.touched.away}>
              <Select
                id="away"
                name="away"
                variant="outlined"
                displayEmpty
                {...formik.getFieldProps("away")}
              >
                <MenuItem value="" disabled>
                  Select a team
                </MenuItem>
                {renderTeams()}
              </Select>
              {formikSelectErrorHelper(formik, "away")}
            </FormControl>
            <FormControl style={{ marginLeft: "10px" }}>
              <TextField
                id="resultAway"
                name="resultAway"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("resultAway")}
                {...formikTextErrorHelper(formik, "resultAway")}
              />
            </FormControl>
          </div>

          <hr />

          <div>
            <h4>Match info</h4>

            <div className="mb-5">
              <FormControl>
                <TextField
                  id="stadium"
                  name="stadium"
                  variant="outlined"
                  placeholder="Enter stadium name"
                  {...formik.getFieldProps("stadium")}
                  {...formikTextErrorHelper(formik, "stadium")}
                />
              </FormControl>
            </div>

            <div className="mb-5">
              <FormControl error={formik.errors.result && formik.touched.result}>
                <Select
                  id="result"
                  name="result"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("result")}
                >
                  <MenuItem value="" disabled>
                    Select a match result
                  </MenuItem>
                  <MenuItem value="w" children="Win" />
                  <MenuItem value="l" children="Lose" />
                  <MenuItem value="n/a" children="Not available" />
                </Select>
                {formikSelectErrorHelper(formik, "result")}
              </FormControl>
            </div>

            <div className="mb-5">
              <FormControl error={formik.errors.final && formik.touched.final}>
                <Select
                  id="final"
                  name="final"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("final")}
                >
                  <MenuItem value="" disabled>
                    Match ended in ...
                  </MenuItem>
                  <MenuItem value="st" children="Standard time" />
                  <MenuItem value="ot" children="Overtime" />
                  <MenuItem value="so" children="Shootout" />
                  <MenuItem value="np" children="Not played" />
                </Select>
                {formikSelectErrorHelper(formik, "final")}
              </FormControl>
            </div>

            <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {matchid ? "Edit match" : "Add match"}
              </Button>
              {matchid && (
                <Button variant="outlined" color="error" disabled={loading} onClick={onRemoveClick}>
                  Remove match
                </Button>
              )}
            </Stack>
          </div>
        </form>
      </div>
      <Dialog open={isDialogOpen} onClose={handleRemoveDialogClose} aria-labelledby="alert-title">
        <DialogTitle id="alert-title">Remove the match from database ?</DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button color="primary" onClick={handleRemoveDialogClose}>
            Cancel
          </Button>
          <Button color="error" onClick={handleRemoveDialogConfirm}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AddEditMatch;
