import { useState, useEffect } from "react";
import useValidation from "./useValidation";
import * as Yup from "yup";
import InputDebounced from "./InputDebounced";
import { matchesCollection } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { showToastError, TextFieldDebounced, TextFieldDebounced2 } from "../Utils/Common";
import { FormControl } from "@mui/material";

const initialFormValues = {
  stadium: "",
  bestWinning: "",
  bestLosing: "",
};

const validationSchema = Yup.object().shape({
  stadium: Yup.string().required("Stadium is required"),
  bestWinning: Yup.string().required("Enter the name of the best player in winning team"),
  bestLosing: Yup.string().required("Enter the name of the best player in losing team"),
});

const DebounceForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialFormValues);
  const { errors, isValid } = useValidation(form, validationSchema);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(matchesCollection.firestore, matchesCollection.path, "HN8R2TF9RNC3OmQvX8AO");

    getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          showToastError(`Match with id: HN8R2TF9RNC3OmQvX8AO not found`);
        }
        const { bestWinning, bestLosing, stadium } = snapshot.data();
        setForm({ stadium, bestWinning, bestLosing });
      })
      .catch((err) => showToastError(err))
      .finally(() => setLoading(false));
  }, []);

  const setInput = (newValue) => {
    setForm((form) => ({ ...form, ...newValue }));
  };

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h3>Form Debounced</h3>
        <form>
          <div className="form-group">
            <InputDebounced
              name="stadium"
              onChange={(e) => setInput({ stadium: e.target.value })}
              label="Stadium"
              error={errors.stadium}
              defaultValue={form.stadium}
            />
          </div>
          <div className="form-group">
            <InputDebounced
              name="bestWinning"
              onChange={(e) => setInput({ bestWinning: e.target.value })}
              label="Best winning player"
              error={errors.bestWinning}
              defaultValue={form.bestWinning}
            />
          </div>
          <div className="form-group">
            <InputDebounced
              name="bestLosing"
              onChange={(e) => setInput({ bestLosing: e.target.value })}
              label="Best losing player"
              error={errors.bestLosing}
              defaultValue={form.bestLosing}
            />
          </div>

          <div className="form-group">
            <button type="button" disabled={!isValid}>
              Submit
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Mui Form</h3>
        <form>
          <div className="mb-5">
            <FormControl>
              <TextFieldDebounced2
                required
                id="stadium"
                name="stadium"
                variant="outlined"
                placeholder="Enter stadium name"
                onChange={(e) => setInput({ stadium: e.target.value })}
                error={errors.stadium}
                defaultValue={form.stadium}
                key={loading ? "not-loaded" : "loaded"}
              />
              {/* <TextFieldDebounced
                required
                disabled={loading}
                id="stadium"
                name="stadium"
                variant="outlined"
                placeholder="Enter stadium name"
                onChange={(e) => setInput({ stadium: e.target.value })}
                defaultValue={loading ? undefined : form.stadium}
              /> */}
            </FormControl>
          </div>
        </form>
      </div>
    </>
  );
};

export default DebounceForm;
