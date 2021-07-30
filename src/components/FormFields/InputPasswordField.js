import React from "react";
// import { at } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function InputField(props) {
  const { ...rest } = props;
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  // function _renderHelperText() {
  //   const [touched, error] = at(meta, "touched", "error");
  //   if (touched && error) {
  //     return error;
  //   }
  // }

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      style={{}}
      variant="outlined"
      error={meta.touched && meta.error && true}
      // helperText={_renderHelperText()}
      {...field}
      {...rest}
      InputProps={{
        classes: {
          root: classes.textFieldRoot,
          focused: classes.textFieldFocused,
          notchedOutline: classes.textFieldNotchedOutline,
        },
        // <-- This is where the toggle button is added.
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        style: {
          color: "black",
        },
      }}
      InputLabelProps={{
        style: { color: "black" },
        classes: {
          root: classes.textFieldLabel,
          focused: classes.textFieldLabelFocused,
        },
      }}
    />
  );
}

const useStyles = makeStyles(() => ({
  textFieldLabel: {
    // this will be applied when input focused (label color change)
    "&$textFieldLabelFocused": {
      color: "black",
    },
  },
  textFieldLabelFocused: {},
  textFieldRoot: {
    // this will be applied when hovered (input text color change)
    "&:hover": {
      color: "black",
    },
    // this will applied when hovered (input border color change)
    "&:hover $textFieldNotchedOutline": {
      borderColor: "black",
    },
    // this will be applied when focused (input border color change)
    "&$textFieldFocused $textFieldNotchedOutline": {
      borderColor: "black",
    },
  },
  textFieldFocused: {},
  textFieldNotchedOutline: {
    borderColor: "black",
  },
}));
