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

import GetAvesResult from "../../utils/apis/GetAvesResult";
import GetAvesDetail from "../../utils/apis/GetAvesDetail";
import translateRaw from "../../utils/translateRaw";

import DialogConfirmation from "../../sections/DialogConfirmation";
import DetailPhoto from "../../sections/DetailPhoto";

import Meta from "components/Meta";

import useStyles from "./styles";

function AvesIdentificationPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPhoto, setOpenPhoto] = React.useState(false);

  const [questionIndex, setQuestionIndex] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenPhoto = () => {
    setOpenPhoto(true);
  };

  const handleClosePhoto = () => {
    setOpenPhoto(false);
  };

  const [avesResult, setAvesResult] = React.useState([]);
  const initialState = [
    {
      jenis_burung_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Burung",
    },
    {
      bentuk_paruh_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Bentuk Paruh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Warna Dominan",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      tipe_cakar_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Tipe Cakar",
    },
  ];
  const [avesValue, setAvesValue] = React.useState([
    {
      jenis_burung_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Burung",
    },
    {
      bentuk_paruh_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Bentuk Paruh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Warna Dominan",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      tipe_cakar_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Tipe Cakar",
    },
  ]);

  const [avesCandidateId, setAvesCandidateId] = React.useState(0);

  const [avesCandidateDetail, setAvesCandidateDetail] = React.useState([]);

  const [avesStatus, setAvesStatus] = React.useState([{}, {}]);

  const [avesImages, setAvesImages] = React.useState([{}]);

  const [avesPlaceOrigin, setAvesPlaceOrigin] = React.useState([]);

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

    console.log(tmpArrayDefault);
    setAvesValue(tmpArrayDefault);
  }
  useEffect(() => {
    if (avesCandidateId !== 0) {
      GetAvesDetail(avesCandidateId).then((result) => {
        setAvesCandidateDetail(result.aves.animal);
        setAvesStatus(result.status_aves);
        setAvesImages(result.images);
        setAvesPlaceOrigin(result.place_origin);
      });
    }
  }, [avesValue, avesCandidateId]);
  return (
    <>
      <Meta title="Aves Identification" description="Aves Identification" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container style={{ width: "340px" }} justify="center" spacing={2}>
          {avesCandidateId !== 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <img
                    className={classes.banner}
                    src={
                      process.env.PUBLIC_URL + "/images/protected_wildlife.png"
                    }
                    alt="Aves"
                  />
                </Grid>
                {avesImages.length === 0 ? (
                  <img
                    className={classes.banner}
                    src={process.env.PUBLIC_URL + "/images/placeholder.png"}
                    alt="Aves"
                  />
                ) : (
                  <img
                    className={classes.bannerImage}
                    //"http://117.53.47.76/html/Satwa/public/storage/uploaded_images/aves/"
                    src={
                      "https://117.53.47.76/storage/uploaded_images/aves/" +
                      avesImages[0].images
                    }
                    alt="Aves"
                    onClick={() => {
                      handleClickOpenPhoto();
                    }}
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {avesCandidateDetail !== undefined && (
                  // <ReactJson src={avesCandidateId} />
                  <Typography>
                    <Box fontStyle="italic">
                      {avesCandidateDetail.scientific_name}
                    </Box>
                  </Typography>
                )}
              </Grid>
              <Grid container justify="center">
                {avesCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Status (IUCN/CITES)
                      </Typography>
                      <Typography>IUCN : {avesStatus[0].iucn}</Typography>
                      <Typography>CITES : {avesStatus[1].cites}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Type
                      </Typography>
                      {avesPlaceOrigin.map((value) => {
                        return (
                          <Typography>{value.habitatType_name}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Characteristics
                      </Typography>
                      {avesPlaceOrigin.map((value) => {
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
                    {/* <ReactJson src={avesPlaceOrigin} /> */}
                  </Grid>
                )}
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    setAvesCandidateId(0);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : avesResult.length > 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h5" className={classes.main}>
                    Kandidat Aves
                  </Typography>
                </Grid>

                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/aves-light.png"}
                  alt="Aves"
                />
              </Grid>
              {avesResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.aves_ID}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          console.log(value.aves_ID);
                          setAvesCandidateId(value.aves_ID);
                          // history.push("/identification/aves/" + value.aves_ID);
                        }}
                      >
                        <CardContent>
                          <img
                            className={classes.placeholder}
                            src={process.env.PUBLIC_URL + value.image}
                            alt="Aves"
                          />
                          <Typography className={classes.subtitle}>
                            {value.scientific_name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}

              <Grid container justify="center">
                <Button
                  onClick={() => {
                    setAvesResult([]);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : (
            <>
              {/* first page */}
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
                    setAvesValue(initialState);
                  }}
                  variant="contained"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    let queryParams = "";
                    let tmpQueryParams = avesValue;

                    tmpQueryParams.forEach(
                      (object) =>
                        (queryParams +=
                          Object.values(object)[0].toString() + ".")
                    );
                    if (queryParams === "0.0.0.0.0.")
                      alert("Berikan 1 ciri-ciri");
                    else {
                      localStorage.setItem("query", queryParams);
                      console.log(queryParams);
                      GetAvesResult(queryParams)
                        .then((result) => {
                          console.log(result);
                          if (result.length === 0) {
                            alert("Kandidat tidak ditemukan");
                          } else setAvesResult(result);
                        })
                        .finally(console.log(avesResult));
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
            questionProps={avesValue[questionIndex]}
            animalType="aves"
          />
          <DetailPhoto
            isVisible={openPhoto}
            onClose={handleClosePhoto}
            photoProps={avesImages[0]}
            animalType="aves"
          />
        </Grid>
      </Container>
    </>
  );
}

export default AvesIdentificationPage;
