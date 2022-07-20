import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TextFieldDebounced } from "../Utils/Common";

const styles = {
  box: {
    display: "flex",
    alignItems: "flex-end",
  },
};

const InputWithIcon = ({ icon, ...rest }) => {
  return (
    <Box sx={styles.box}>
      {icon}
      <TextField {...rest} />
    </Box>
  );
};

export const DebouncedInputWithIcon = ({ icon, ...rest }) => {
  return (
    <Box sx={styles.box}>
      {icon}
      <TextFieldDebounced {...rest} />
    </Box>
  );
};

export default InputWithIcon;
