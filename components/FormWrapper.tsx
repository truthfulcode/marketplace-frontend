import React from "react";
import { Box } from "@mui/material";
import { styles } from "./StyledComponents";
import FormGroup from "@mui/material/FormGroup";
// @ts-ignore
const FormWrapper = ({ children, method, onSubmit }) => {
  return (
    <Box sx={{ ...styles.center, mt: "10%" ,flexDirection:"column" }}>
      <Box
        sx={{
          p: "8px",
          borderRadius: 2,
          minHeight: "300px",
          alignItems: "flex-start",
          flexDirection: "column",
          ...styles.subForm,
          border: "2px solid black",
        }}
      >
        <form method={method} onSubmit={onSubmit}>
          <FormGroup>{children}</FormGroup>
        </form>
      </Box>
    </Box>
  );
};

export default FormWrapper;
