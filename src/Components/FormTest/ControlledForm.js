import { useState } from "react";
import useValidation from "./useValidation";
import * as Yup from "yup";
import Input from "./Input";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("E-mail is invalid").required("E-mail is required"),
  password: Yup.string().min(8, "Minimum is 8 characters").max(20, "Maximum is 20 characters"),
});

const ControlledForm = () => {
  const [form, setForm] = useState(initialFormValues);
  const { errors } = useValidation(form, validationSchema);

  const setInput = (inputName) => {
    return (e) => {
      const newValue = { [inputName]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
    };
  };

  return (
    <>
      <h3>Form Controlled</h3>
      <form>
        <div className="form-group">
          <Input
            name="name"
            onChange={setInput("name")}
            label="Name"
            value={form.name}
            error={errors.name}
          />
        </div>
        <div className="form-group">
          <Input
            name="email"
            onChange={setInput("email")}
            label="E-mail"
            value={form.email}
            error={errors.email}
          />
        </div>
        <div className="form-group">
          <Input
            name="password"
            onChange={setInput("password")}
            label="Password"
            value={form.password}
            error={errors.password}
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ControlledForm;
