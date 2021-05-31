import React from "react";

import {
  Grid,
  Typography,
  Container,

  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function AvesCandidate(props) {
  const classes = useStyles();
  const { queryParams } = props.match.params;
  console.log(queryParams);
  return (
    <>
      <Meta title="Page 2" description="Page 2" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container>
          <Grid item>
            <Typography variant="h5" className={classes.main}>
              Identifikasi Aves
            </Typography>
          </Grid>
          <img
            className={classes.titleImage}
            src={process.env.PUBLIC_URL + "/images/aves-light.png"}
            alt="Aves"
          />
        </Grid>
      </Container>
    </>
  );
}

export default AvesCandidate;
