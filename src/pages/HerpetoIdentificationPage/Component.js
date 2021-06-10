import React, { useEffect } from "react";

import {
  Grid,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

import GetHerpetoResult from "../../utils/apis/GetHerpetoResult";
import GetHerpetoDetail from "../../utils/apis/GetHerpetoDetail";
import translateRaw from "../../utils/translateRaw";

import DialogConfirmation from "../../sections/DialogConfirmation";

import Meta from "components/Meta";

import useStyles from "./styles";

function HerpetoIdentificationPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [herpetoResult, setHerpetoResult] = React.useState([]);
  const initialState = [
    {
      jenis_hewan_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      jenis_sisik_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Jenis Sisik",
    },
    {
      bentuk_kaki_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Bentuk Kaki",
    },
    {
      has_kaki_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Berkaki?",
    },
    {
      jenis_moncong_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Jenis Moncong",
    },
    {
      jenis_tempurung_ID: "0",
      image: "/images/not_sure.png",
      id: "q6",
      value: "Jenis Tempurung",
    },
    {
      jenis_ekor_ID: "0",
      image: "/images/not_sure.png",
      id: "q7",
      value: "Jenis Ekor (Khusus Biawak)",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure.png",
      id: "q8",
      value: "Ukuran Tubuh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure.png",
      id: "q9",
      value: "Warna Kulit/Sisik Dominan",
    },
  ];
  const [herpetoValue, setHerpetoValue] = React.useState([
    {
      jenis_hewan_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      jenis_sisik_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Jenis Sisik",
    },
    {
      bentuk_kaki_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Bentuk Kaki",
    },
    {
      has_kaki_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Berkaki?",
    },
    {
      jenis_moncong_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Jenis Moncong",
    },
    {
      jenis_tempurung_ID: "0",
      image: "/images/not_sure.png",
      id: "q6",
      value: "Jenis Tempurung",
    },
    {
      jenis_ekor_ID: "0",
      image: "/images/not_sure.png",
      id: "q7",
      value: "Jenis Ekor (Khusus Biawak)",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure.png",
      id: "q8",
      value: "Ukuran Tubuh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure.png",
      id: "q9",
      value: "Warna Kulit/Sisik Dominan",
    },
  ]);

  const [herpetoCandidateId, setHerpetoCandidateId] = React.useState(0);

  const [herpetoCandidateDetail, setHerpetoCandidateDetail] = React.useState(
    []
  );

  const [herpetoStatus, setHerpetoStatus] = React.useState([{}, {}]);

  const [herpetoImages, setHerpetoImages] = React.useState([{}]);

  const [herpetoPlaceOrigin, setHerpetoPlaceOrigin] = React.useState([]);

  function onUpdateItem(props) {
    console.log(props);
    console.log("index to change :" + questionIndex);
    let tmpArrayDefault = herpetoValue.map((item, j) => {
      if (questionIndex === j) {
        return props;
      } else {
        return item;
      }
    });

    console.log(tmpArrayDefault);
    setHerpetoValue(tmpArrayDefault);
  }
  useEffect(() => {
    if (herpetoCandidateId !== 0) {
      GetHerpetoDetail(herpetoCandidateId).then((result) => {
        setHerpetoCandidateDetail(result.herpeto.animal);
        setHerpetoStatus(result.status_herpeto);
        setHerpetoImages(result.images);
        setHerpetoPlaceOrigin(result.place_origin);
      });
    }
  }, [herpetoValue, herpetoCandidateId]);
  return (
    <>
      <Meta
        title="Herpetofauna Identification"
        description="Herpetofauna Identification"
      />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container style={{ width: "340px" }} justify="center" spacing={2}>
          {herpetoCandidateId !== 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <img
                    className={classes.banner}
                    src={
                      process.env.PUBLIC_URL + "/images/protected_wildlife.png"
                    }
                    alt="Herpetofauna"
                  />
                </Grid>
                {herpetoImages.length === 0 ? (
                  <img
                    className={classes.banner}
                    src={process.env.PUBLIC_URL + "/images/placeholder.png"}
                    alt="Herpetofauna"
                  />
                ) : (
                  <img
                    className={classes.bannerImage}
                    src={
                      "http://117.53.47.76/html/Satwa/public/uploaded_images/herpeto/" +
                      herpetoImages[0].images
                    }
                    alt="Herpetofauna"
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {herpetoCandidateDetail !== undefined && (
                  // <ReactJson src={herpetoCandidateId} />
                  <Typography>
                    <Box fontStyle="italic">
                      {herpetoCandidateDetail.scientific_name}
                    </Box>
                  </Typography>
                )}
              </Grid>
              <Grid container justify="center">
                {herpetoCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Status (IUCN/CITES)
                      </Typography>
                      <Typography>IUCN : {herpetoStatus[0].iucn}</Typography>
                      <Typography>CITES : {herpetoStatus[1].cites}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Type
                      </Typography>
                      {herpetoPlaceOrigin.map((value) => {
                        return (
                          <Typography>{value.habitatType_name}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Characteristics
                      </Typography>
                      {herpetoPlaceOrigin.map((value) => {
                        return (
                          <Typography>{value.habitatType_character}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Location/Distribution
                      </Typography>
                    </Grid>
                    {/* <ReactJson src={herpetoPlaceOrigin} /> */}
                  </Grid>
                )}
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    setHerpetoCandidateId(0);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : herpetoResult.length > 0 ? (
            <>
              <Grid container>
                <Grid item>
                  <Typography variant="h5" className={classes.main}>
                    Kandidat Herpetofauna
                  </Typography>
                </Grid>

                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/hetero-light.png"}
                  alt="Herpetofauna"
                />
              </Grid>
              {herpetoResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.herpeto_ID}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          console.log(value.herpeto_ID);
                          setHerpetoCandidateId(value.herpeto_ID);
                          // history.push("/identification/herpeto/" + value.herpeto_ID);
                        }}
                      >
                        <CardContent>
                          <img
                            className={classes.placeholder}
                            src={process.env.PUBLIC_URL + value.image}
                            alt="Herpetofauna"
                          />
                          <Typography className={classes.subtitle}>
                            {value.value !== ""
                              ? value.value
                              : translateRaw(value)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}

              <Grid>
                <Button
                  onClick={() => {
                    setHerpetoResult([]);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid container>
                <Grid item>
                  <Typography variant="h5" className={classes.main}>
                    Identifikasi Herpetofauna
                  </Typography>
                </Grid>
                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/hetero-light.png"}
                  alt="Herpetofauna"
                />
              </Grid>

              {herpetoValue.map((value, index) => {
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
                            alt="Herpetofauna"
                          />
                          <Typography className={classes.subtitle}>
                            {value.value !== ""
                              ? value.value
                              : translateRaw(value)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
              <Grid>
                <Button
                  onClick={() => {
                    setHerpetoValue(initialState);
                  }}
                  variant="contained"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    let queryParams = "";
                    let tmpQueryParams = herpetoValue;

                    tmpQueryParams.forEach(
                      (object) =>
                        (queryParams += Object.values(object)[0].toString())
                    );
                    console.log(queryParams[0]);
                    let debug = "21115";
                    if (debug === "00000") alert("Berikan 1 ciri-ciri");
                    else {
                      localStorage.setItem("query", queryParams);
                      GetHerpetoResult(queryParams)
                        .then((result) => {
                          if (result.length === 0) {
                            alert("Kandidat tidak ditemukan");
                          } else setHerpetoResult(result);
                        })
                        .finally(console.log(herpetoResult));
                    }
                  }}
                  variant="contained"
                >
                  Telusuri
                </Button>
              </Grid>
            </>
          )}

          <DialogConfirmation
            isVisible={open}
            onClose={handleClose}
            onUpdateItem={onUpdateItem}
            questionProps={herpetoValue[questionIndex]}
          />
        </Grid>
      </Container>
    </>
  );
}

export default HerpetoIdentificationPage;
