import React from "react";
// import { at } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

export default function InputField(props) {
  const {
    // errorText,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const classes = useStyles();

  // function _renderHelperText() {
  //   const [touched, error] = at(meta, "touched", "error");
  //   if (touched && error) {
  //     return error;
  //   }
  // }

  return (
    <>
      <TextField
        type="text"
        autoComplete="off"
        variant="outlined"
        error={meta.touched && meta.error && true}
        InputProps={{
          style: {
            color: "black",
          },
          classes: {
            root: classes.textFieldRoot,
            focused: classes.textFieldFocused,
            notchedOutline: classes.textFieldNotchedOutline,
          },
        }}
        InputLabelProps={{
          style: { color: "black" },
          classes: {
            root: classes.textFieldLabel,
            focused: classes.textFieldLabelFocused,
          },
        }}
        // helperText={_renderHelperText()}
        {...field}
        {...rest}
      />
    </>
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
