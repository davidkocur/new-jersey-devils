import DebounceForm from "./DebounceForm";
import "./FormTest.css";

const FormTest = () => {
  return (
    <div className="full_height_wrapper">
      <div className="form_test-container">
        <DebounceForm />
      </div>
    </div>
  );
  // return (
  //   <div className="full_height_wrapper">
  //     <Grid container className="form_test-container">
  //       <Grid item xs={6}>
  //         <DebounceForm />
  //       </Grid>
  //       <Grid item xs={6}>
  //         <ControlledForm />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default FormTest;
