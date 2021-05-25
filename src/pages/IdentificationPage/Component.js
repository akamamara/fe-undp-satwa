import React from "react";
// import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Container,
  // Card,
  // CardContent,
  // CardActionArea,
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";

// import useTheme from "store/theme";

import Meta from "components/Meta";

import useStyles from "./styles";

function IdentificationPage(props) {
  const { animalType } = props.match.params;
  const classes = useStyles();
  // const [, themeActions] = useTheme();
  // function themeGoGreen() {
  //   themeActions.goGreen();
  // }

  function getInitialValue() {
    if (animalType === "aves") {
      const avesInitialvalue = {
        jenis_burung_ID: "0",
        bentuk_paruh_ID: "0",
        warna_ID: "0",
        ukuran_tubuh_ID: "0",
        tipe_cakar_ID: "0",
      };
      return avesInitialvalue;
    }

    // if (animalType === "mammals")
  }

  // function renderInitialValue(initialValue) {}

  let initialValue = getInitialValue();
  console.log(initialValue);

  return (
    <>
      <Meta title="Page 1" description="Page 1" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container>
          <Grid item>
            <Typography variant="h5" className={classes.main}>
              Identifikasi {animalType}
            </Typography>
          </Grid>

          <img
            className={classes.titleImage}
            src={process.env.PUBLIC_URL + "/images/aves-light.png"}
            alt="Aves"
          />
        </Grid>

        <Grid container></Grid>
      </Container>
    </>
  );
}

export default IdentificationPage;
