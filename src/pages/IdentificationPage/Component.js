import React, { useEffect } from "react";
import ReactJson from "react-json-view";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Button,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";

import GetAvesResult from "../../utils/apis/GetAvesResult";
import translateRaw from "../../utils/translateRaw";

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

  //testing
  // function renderInitialValue(initialValue) {}

  // console.log(initialValue);
  // eslint-disable-next-line
  const [avesValue, setAvesValue] = React.useState([
    { jenis_burung_ID: "2" },
    { bentuk_paruh_ID: "1" },
    { warna_ID: "1" },
    { ukuran_tubuh_ID: "1" },
    { tipe_cakar_ID: "5" },
  ]);

  const [avesResult, setAvesResult] = React.useState([]);
  useEffect(() => {
    console.log(localStorage.getItem("result"));
  }, []);
  return (
    <>
      <Meta title="Page 1" description="Page 1" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container>
          <Grid item>
            {avesResult.length === 0 ? (
              <Typography variant="h5" className={classes.main}>
                Identifikasi {animalType}
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.main}>
                Kandidat {animalType}
              </Typography>
            )}
          </Grid>

          <img
            className={classes.titleImage}
            src={process.env.PUBLIC_URL + "/images/aves-light.png"}
            alt="Aves"
          />
        </Grid>
        {avesResult.length === 0 ? (
          <>
            <Grid
              container
              style={{ width: "340px" }}
              justify="center"
              spacing={2}
            >
              {avesValue.map((value) => {
                return (
                  <Grid item xs={6} key={Object.keys(value)}>
                    <Card>
                      <CardActionArea
                        onClick={() => console.log(Object.keys(value))}
                      >
                        <CardContent>
                          <img
                            className={classes.placeholder}
                            src={
                              process.env.PUBLIC_URL + "/images/placeholder.png"
                            }
                            alt="Aves"
                          />
                          <Typography className={classes.subtitle}>
                            {translateRaw(Object.keys(value))}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              onClick={() => {
                // console.log(avesValue);
                GetAvesResult(avesValue).then((result) => {
                  // setAvesResult(result);
                  // localStorage.setItem("result", result);
                  console.log(result);
                });
              }}
              variant="contained"
            >
              Telusuri
            </Button>
          </>
        ) : (
          <>
            <Grid
              container
              style={{ width: "340px" }}
              justify="center"
              spacing={2}
            >
              {avesResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.aves_ID}>
                    <Card>
                      <CardActionArea
                        component={RouterLink}
                        to={"/aves_candidates/" + value.aves_ID}
                      >
                        <CardContent>
                          <img
                            className={classes.placeholder}
                            src={
                              process.env.PUBLIC_URL + "/images/placeholder.png"
                            }
                            alt="Aves"
                          />
                          <Typography className={classes.subtitle}>
                            {value.aves_ID}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Grid container direction="row">
              <Button
                onClick={() => {
                  setAvesResult([]);
                }}
                variant="contained"
              >
                Kembali
              </Button>
              <Button
                onClick={() => {
                  console.log(avesValue);
                  GetAvesResult(avesValue).then((result) =>
                    // setAvesResult(result)
                    console.log(result)
                  );
                }}
                variant="contained"
              >
                Telusuri
              </Button>
            </Grid>
          </>
        )}

        <ReactJson src={avesResult} />
      </Container>
    </>
  );
}

export default IdentificationPage;
