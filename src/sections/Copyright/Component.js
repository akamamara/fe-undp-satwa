import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Fb from "components/Fb";
import { copyright } from "config";

import useStyles from "./styles";

function Copyright() {
  const classes = useStyles();

  return (
    <Fb justifyCenter pt={4} pb={2}>
      <Typography
        className={classes.copyright}
        variant="body2"
        color="textSecondary"
      >
        {copyright.title}
        <Link color="inherit">{copyright.link}</Link>
      </Typography>
    </Fb>
  );
}

export default Copyright;
