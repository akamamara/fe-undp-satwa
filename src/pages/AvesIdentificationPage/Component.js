import React, { useEffect } from "react";

import {
  Grid,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardActionArea,
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
      image: "/images/not_sure_100.png",
      id: "q1",
      value: "Jenis Burung",
    },
    {
      bentuk_paruh_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q2",
      value: "Bentuk Paruh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q3",
      value: "Warna Dominan",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      tipe_cakar_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q5",
      value: "Tipe Cakar",
    },
  ];
  const [avesValue, setAvesValue] = React.useState([
    {
      jenis_burung_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q1",
      value: "Jenis Burung",
    },
    {
      bentuk_paruh_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q2",
      value: "Bentuk Paruh",
    },
    {
      warna_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q3",
      value: "Warna Dominan",
    },
    {
      ukuran_tubuh_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      tipe_cakar_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q5",
      value: "Tipe Cakar",
    },
  ]);

  const [avesCandidateId, setAvesCandidateId] = React.useState(0);

  const [avesCandidateDetail, setAvesCandidateDetail] = React.useState([]);

  const [avesStatus, setAvesStatus] = React.useState([{}, {}]);

  const [avesImages, setAvesImages] = React.useState([{}]);

  // eslint-disable-next-line no-unused-vars
  const [avesPlaceOrigin, setAvesPlaceOrigin] = React.useState([]);

  const [avesIndonesianName, setAvesIndonesianName] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [avesEnglishName, setAvesEnglishName] = React.useState([]);
  const [avesArea, setAvesArea] = React.useState([]);

  function onUpdateItem(props) {
    console.log("index to change : " + questionIndex);
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
        setAvesIndonesianName(result.indonesian_name[0].indonesian_name);
        setAvesEnglishName(result.english_name[0].english_name);
        setAvesArea(result.area[0]);
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
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Aves"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                ) : avesImages[0].images !== undefined ? (
                  <img
                    className={classes.bannerImage}
                    alt="Aves"
                    src={
                      "https://the-next-project.my.id/storage/uploaded_images/aves/" +
                      avesImages[0].images
                    }
                    onClick={() => {
                      handleClickOpenPhoto();
                    }}
                  />
                ) : (
                  <img
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Aves"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {avesCandidateDetail !== undefined && (
                  <Box>
                    <Typography align="center">{avesIndonesianName}</Typography>

                    <Box fontStyle="italic">
                      <Typography>
                        {avesCandidateDetail.scientific_name}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid container justify="center">
                {avesCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6" className={classes.yellow}>
                          Status (IUCN/CITES)
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>IUCN : {avesStatus[0].iucn}</Typography>
                        <Typography>CITES : {avesStatus[1].cites}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Type
                      </Typography>
                      <Typography>{avesArea.habitat_type}</Typography>
                    </Grid>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Location/Distribution
                      </Typography>
                      <Typography>{avesArea.area}</Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid className={classes.backButton}>
                <Button
                  onClick={() => {
                    setAvesCandidateId(0);
                    setAvesImages([{}]);
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
                          console.log(value);
                          setAvesCandidateId(value.aves_ID);
                        }}
                      >
                        {value.images === null ? (
                          <CardMedia
                            style={{
                              height: "120px",
                              borderLeft: "10px solid #FFC000",
                            }}
                            image={
                              process.env.PUBLIC_URL +
                              "/images/not_sure_100.png"
                            }
                          />
                        ) : (
                          <CardMedia
                            style={{
                              height: "120px",
                              borderLeft: "10px solid #FFC000",
                            }}
                            image={
                              "https://the-next-project.my.id/storage/uploaded_images/aves/" +
                              value.images.images
                            }
                          />
                        )}

                        {value.scientific_name > 18 ? (
                          <Typography
                            style={{
                              position: "absolute",
                              top: "65%",
                              width: "100%",
                              textAlign: "left",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.75rem",
                              padding: "5px 0px 20px 10px",
                            }}
                          >
                            {value.scientific_name}
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              position: "absolute",
                              top: "75%",
                              width: "100%",
                              textAlign: "left",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.75rem",
                              padding: "5px 0px 10px 10px",
                            }}
                          >
                            {value.scientific_name}
                          </Typography>
                        )}
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}

              <Grid container justify="center" className={classes.backButton}>
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
                          setQuestionIndex(index);
                          handleClickOpen();
                        }}
                      >
                        <CardMedia
                          style={{
                            height: "120px",
                            borderLeft: "10px solid #FFC000",
                          }}
                          image={process.env.PUBLIC_URL + value.image}
                        />
                        {value.value.length > 25 ? (
                          <Typography
                            style={{
                              position: "absolute",
                              top: "65%",
                              width: "100%",
                              textAlign: "left",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.75rem",
                              padding: "5px 0px 20px 10px",
                            }}
                          >
                            {value.value !== ""
                              ? value.value
                              : translateRaw(value)}
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              position: "absolute",
                              top: "75%",
                              width: "100%",
                              textAlign: "left",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.75rem",
                              padding: "5px 0px 10px 10px",
                            }}
                          >
                            {value.value !== ""
                              ? value.value
                              : translateRaw(value)}
                          </Typography>
                        )}
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
              <Grid container justify="space-evenly">
                <Grid item>
                  <Button
                    onClick={() => {
                      setAvesValue(initialState);
                    }}
                    variant="contained"
                  >
                    Ulangi
                  </Button>
                </Grid>
                <Grid item>
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
                        alert("Berikan minimal 1 ciri-ciri identifikasi");
                      else {
                        localStorage.setItem("query", queryParams);
                        console.log(queryParams);
                        GetAvesResult(queryParams)
                          .then((result) => {
                            console.log(result);
                            if (result.length === 0) {
                              alert("Kandidat tidak dilindungi");
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
          {avesImages[0] === undefined ? null : (
            <DetailPhoto
              isVisible={openPhoto}
              onClose={handleClosePhoto}
              photoProps={avesImages[0]}
              animalType="aves"
            />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AvesIdentificationPage;
