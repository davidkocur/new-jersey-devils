import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  formikSelectErrorHelper,
  formikTextErrorHelper,
  showToastError,
  showToastSuccess,
} from "../../Utils/Common";
import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { playersCollection, storage } from "../../../firebase";
import ImageUploader from "../../Utils/ImageUploader";

const messages = {
  required: "This input is required",
  imageRequired: "Player image is required",
  wrongNumber: "Please enter valid player number",
};

const defaultFormValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: "",
  imageURL: "",
};

const AddEditPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [defaultImg, setDefaultImg] = useState("");
  const [playerDocRef, setPlayerDocRef] = useState(null);

  const { playerid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerid) {
      //We are editing
      setLoading(true);
      const docRef = doc(playersCollection.firestore, playersCollection.path, playerid);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            showToastError(`Sorry player with id ${playerid} was not found`);
            setLoading(false);
            navigate("../admin-players", { replace: true });
            return;
          }

          const imageRef = ref(storage, `players/${snapshot.data().image}`);
          getDownloadURL(imageRef)
            .then((url) => {
              updateImage(snapshot.data().image);
              setDefaultImg(url);
            })
            .catch((err) => {
              console.error(err);
              showToastError("" + err.message);
            });

          setFormValues(snapshot.data());
          setPlayerDocRef(docRef);
        })
        .catch((err) => {
          showToastError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [playerid]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: Yup.object({
      name: Yup.string().required(messages.required),
      lastname: Yup.string().required(messages.required),
      number: Yup.number()
        .required(messages.required)
        .min(1, messages.wrongNumber)
        .max(99, messages.wrongNumber),
      position: Yup.string().required(messages.required),
      image: Yup.string().required(messages.imageRequired),
      imageURL: Yup.string(),
    }),
    onSubmit: (values) => submitForm(values),
  });

  console.log(formik.values.image);

  const submitForm = (values) => {
    setLoading(true);

    if (playerid) {
      //We are editing
      updateDoc(playerDocRef, values)
        .then(() => {
          showToastSuccess("Player was updated");
          navigate("../admin-players", { replace: true });
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    } else {
      //We are adding
      addDoc(playersCollection, values)
        .then(() => {
          showToastSuccess("Player was added");
          formik.resetForm();
          navigate("../admin-players", { replace: true });
        })
        .catch((err) => showToastError(err))
        .finally(() => setLoading(false));
    }
  };

  const onRemoveClick = () => {
    setDialogOpen(true);
  };

  const handleRemoveDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRemoveDialogConfirm = () => {
    setDialogOpen(false);
    setLoading(true);
    deleteDoc(playerDocRef)
      .then(() => {
        showToastSuccess("Player was removed");
        navigate("../admin-players", { replace: true });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const updateImage = (filename, url) => {
    formik.setFieldValue("image", filename);
    formik.setFieldValue("imageURL", url);
  };

  const resetImage = () => {
    formik.setFieldValue("image", "");
    formik.setFieldValue("imageURL", "");
    setDefaultImg("");
  };

  return (
    <AdminLayout title={playerid ? "Edit player" : "Add player"}>
      <div className="editplayers_dialog_wrapper">
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl error={formik.errors.image && formik.touched.image}>
            <ImageUploader
              dir="players"
              defaultImg={defaultImg}
              defaultImgName={formik.values.image}
              onUploadSuccess={(filename, url) => updateImage(filename, url)}
              onImageReset={resetImage}
            />
            {formikSelectErrorHelper(formik, "image")}
          </FormControl>

          <hr />
          <h4>Player info</h4>

          <div className="mb-5">
            <FormControl>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                placeholder="Player first name"
                {...formik.getFieldProps("name")}
                {...formikTextErrorHelper(formik, "name")}
              />
            </FormControl>
          </div>

          <div className="mb-5">
            <FormControl>
              <TextField
                id="lastname"
                name="lastname"
                variant="outlined"
                placeholder="Player last name"
                {...formik.getFieldProps("lastname")}
                {...formikTextErrorHelper(formik, "lastname")}
              />
            </FormControl>
          </div>

          <div className="mb-5">
            <FormControl>
              <TextField
                type={"number"}
                id="number"
                name="number"
                variant="outlined"
                placeholder="Player number"
                {...formik.getFieldProps("number")}
                {...formikTextErrorHelper(formik, "number")}
              />
            </FormControl>
          </div>

          <div className="mb-5">
            <FormControl error={formik.errors.position && formik.touched.position}>
              <Select
                id="position"
                name="position"
                variant="outlined"
                displayEmpty
                {...formik.getFieldProps("position")}
              >
                <MenuItem value="" disabled>
                  Select a position
                </MenuItem>
                <MenuItem value="Forwards">Forwards</MenuItem>
                <MenuItem value="Defense">Defense</MenuItem>
                <MenuItem value="Goalie">Goalie</MenuItem>
              </Select>
              {formikSelectErrorHelper(formik, "position")}
            </FormControl>
          </div>

          <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {playerid ? "Edit player" : "Add player"}
            </Button>
            {playerid && (
              <Button
                type="button"
                variant="outlined"
                color="error"
                disabled={loading}
                onClick={onRemoveClick}
              >
                Remove player
              </Button>
            )}
          </Stack>
        </form>
      </div>
      <Dialog open={isDialogOpen} onClose={handleRemoveDialogClose} aria-labelledby="alert-title">
        <DialogTitle id="alert-title">Remove the player from database?</DialogTitle>
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

export default AddEditPlayers;
