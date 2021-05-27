import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Meta from "components/Meta";

import useStyles from "./styles";

function AvesCandidate() {
  const classes = useStyles();

  return (
    <>
      <Meta title="Page 2" description="Page 2" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h3">
          Aves Show Candidates Get Query Params
        </Typography>
      </Container>
    </>
  );
}

export default AvesCandidate;
