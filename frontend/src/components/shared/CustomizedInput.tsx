// import React from "react";
import TextField from "@mui/material/TextField";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField //to create a textbox for like email and password
      margin="normal"
      fullWidth
      sx={{ 
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiOutlinedInput-root': {
         
          width: "100%",
          borderRadius: 2,
          fontSize: 20,
          color: "white",
        }
      }}
      name={props.name}
      label={props.label}
      type={props.type}

   
    />
  );
};

export default CustomizedInput;
