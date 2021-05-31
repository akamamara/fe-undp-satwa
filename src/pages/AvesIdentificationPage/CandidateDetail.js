import React, { useEffect } from "react";

import {
  Grid,
  Typography,
  Container,

  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";

import GetAvesDetail from "../../utils/apis/GetAvesDetail";
import Meta from "components/Meta";

import useStyles from "./styles";

function AvesCandidateDetail(props) {
  const classes = useStyles();
  const { aves_id } = props.match.params;
  const [avesDetail, setAvesDetail] = React.useState();
  useEffect(() => {
    GetAvesDetail(aves_id)
      .then((result) => {
        setAvesDetail(result);
        console.log(result.aves.animal.scientific_name);
      })
      .finally(console.log("test"));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Page 2" description="Page 2" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container justify="center" direction="row">
          <Grid item>
            <img
              className={classes.titleImage}
              src={process.env.PUBLIC_URL + "/images/protected_wildlife.png"}
              alt="Aves"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <img
            className={classes.titleImage}
            src={process.env.PUBLIC_URL + "/images/placeholder.png"}
            alt="Aves"
          />
        </Grid>
        <Grid container justify="center">
          {avesDetail !== undefined && (
            <Typography>{avesDetail.aves.animal.scientific_name}</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AvesCandidateDetail;
