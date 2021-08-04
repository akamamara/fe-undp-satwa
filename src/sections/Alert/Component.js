import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

function AlertPopup(props) {
  const { string, open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> </DialogTitle>
      <DialogContent>{string}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertPopup;
