import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

import DialogConfirmation from "../../sections/DialogConfirmation";
// import useTheme from "store/theme";

import Meta from "components/Meta";

import useStyles from "./styles";

function AvesIdentificationPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [, themeActions] = useTheme();
  // function themeGoGreen() {
  //   themeActions.goGreen();
  // }

  const [avesValue, setAvesValue] = React.useState([
    {
      jenis_burung_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      valueName: "",
    },
    {
      bentuk_paruh_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      valueName: "",
    },
    { warna_ID: "0", image: "/images/not_sure.png", id: "q3", valueName: "" },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      valueName: "",
    },
    {
      tipe_cakar_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      valueName: "",
    },
  ]);

  const [avesRequest, setAvesRequest] = React.useState([]);

  function onUpdateItem(props) {
    console.log(props);
    console.log("index to change :" + questionIndex);
    let tmpArrayDefault = avesValue.map((item, j) => {
      if (questionIndex === j) {
        return props;
      } else {
        return item;
      }
    });
    // let tmpSubmit = {
    //   bentuk_paruh_ID: "2",
    //   image: "/images/placeholder.png",
    //   id: "q1",
    //   valueName: "Burung Darat",
    // };

    // let tmpArrayDefault = avesValue.map((item, j) => {
    //   if (index === j) {
    //     return tmpSubmit;
    //   } else {
    //     return item;
    //   }
    // });

    console.log(tmpArrayDefault);
    setAvesValue(tmpArrayDefault);
  }
  useEffect(() => {}, [avesValue]);
  return (
    <>
      <Meta title="Aves Identification" description="Aves Identification" />
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

        <Grid container style={{ width: "340px" }} justify="center" spacing={2}>
          {avesValue.map((value, index) => {
            return (
              <Grid item xs={6} key={Object.keys(value)}>
                <Card style={{ backgroundColor: "green" }}>
                  <CardActionArea
                    onClick={() => {
                      // console.log(Object.values(value));
                      setQuestionIndex(index);
                      handleClickOpen();
                    }}
                  >
                    <CardContent>
                      <img
                        className={classes.placeholder}
                        src={process.env.PUBLIC_URL + value.image}
                        alt="Aves"
                      />
                      <Typography className={classes.subtitle}>
                        {value.value !== ""
                          ? value.value
                          : translateRaw(Object.keys(value))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}

          {/* {avesRequest.map((value, index) => {
            return (
              <Grid item xs={6} key={Object.keys(value)}>
                <Card style={{ backgroundColor: "green" }}>
                  <CardActionArea
                    onClick={() => console.log(Object.values(value))}
                  >
                    <CardContent>
                      <img
                        className={classes.placeholder}
                        src={process.env.PUBLIC_URL + value.image}
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
          })} */}
          <DialogConfirmation
            isVisible={open}
            onClose={handleClose}
            onUpdateItem={onUpdateItem}
            questionProps={avesValue[questionIndex]}
          />
        </Grid>
        <Button
          onClick={() => {
            console.log("OnSubmit");
            console.log(avesValue);

            let queryParams = "";
            avesValue.forEach(
              (object) => (queryParams += Object.values(object)[0].toString())
            );
            // avesValue.forEach((object) =>
            //   console.log(Object.values(object)[0])
            // );
            if (queryParams === "00000") alert("berikan 1 ciri-ciri");
            else console.log(queryParams);
            // else history.push("aves/" + queryParams);
          }}
          variant="contained"
        >
          Telusuri
        </Button>

        <Button
          onClick={() => {
            let index = 1;
            let tmpSubmit = {
              bentuk_paruh_ID: "2",
              image: "/images/placeholder.png",
              id: "q1",
              valueName: "Burung Darat",
            };

            let tmpArrayDefault = avesValue.map((item, j) => {
              if (index === j) {
                return tmpSubmit;
              } else {
                return item;
              }
            });

            console.log(tmpArrayDefault);
            setAvesValue(tmpArrayDefault);
          }}
          variant="contained"
        >
          Change
        </Button>
      </Container>
    </>
  );
}

export default AvesIdentificationPage;
