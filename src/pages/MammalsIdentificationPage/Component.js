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

import GetMammalsResult from "../../utils/apis/GetMammalsResult";
import GetMammalsDetail from "../../utils/apis/GetMammalsDetail";
import translateRaw from "../../utils/translateRaw";

import DialogConfirmation from "../../sections/DialogConfirmation";
import DetailPhoto from "../../sections/DetailPhoto";

import Meta from "components/Meta";

import useStyles from "./styles";

function MammalsIdentificationPage() {
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

  const [mammalsResult, setMammalsResult] = React.useState([]);
  const initialState = [
    {
      tipe_mammals_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      alat_gerak_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Alat Gerak",
    },
    {
      third_attribute_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Ciri Fisik Utama",
    },
    {
      jenis_kulit_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Jenis Kulit",
    },
    {
      ukuran_tubuh_mammals_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Ukuran Tubuh",
    },
    {
      bertanduk_bertaring_ID: "0",
      image: "/images/not_sure.png",
      id: "q6",
      value: "Bertanduk/Bertaring",
    },
    {
      has_moncong: "0",
      image: "/images/not_sure.png",
      id: "q7",
      value: "Mempunyai Moncong",
    },
    {
      has_ekor: "0",
      image: "/images/not_sure.png",
      id: "q8",
      value: "Mempunyai Ekor",
    },
    {
      jumlah_kuku: "0",
      image: "/images/not_sure.png",
      id: "q9",
      value: "Jumlah Kuku",
    },
    {
      jumlah_cula: "0",
      image: "/images/not_sure.png",
      id: "q10",
      value: "Jumlah Cula",
    },
  ];
  const [mammalsValue, setMammalsValue] = React.useState([
    {
      tipe_mammals_ID: "0",
      image: "/images/not_sure.png",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      alat_gerak_ID: "0",
      image: "/images/not_sure.png",
      id: "q2",
      value: "Alat Gerak",
    },
    {
      third_attribute_ID: "0",
      image: "/images/not_sure.png",
      id: "q3",
      value: "Ciri Fisik Utama",
    },
    {
      jenis_kulit_ID: "0",
      image: "/images/not_sure.png",
      id: "q4",
      value: "Jenis Kulit",
    },
    {
      ukuran_tubuh_mammals_ID: "0",
      image: "/images/not_sure.png",
      id: "q5",
      value: "Ukuran Tubuh",
    },
    {
      bertanduk_bertaring_ID: "0",
      image: "/images/not_sure.png",
      id: "q6",
      value: "Bertanduk/Bertaring",
    },
    {
      has_moncong: "0",
      image: "/images/not_sure.png",
      id: "q7",
      value: "Mempunyai Moncong",
    },
    {
      has_ekor: "0",
      image: "/images/not_sure.png",
      id: "q8",
      value: "Mempunyai Ekor",
    },
    {
      jumlah_kuku: "0",
      image: "/images/not_sure.png",
      id: "q9",
      value: "Jumlah Kuku",
    },
    {
      jumlah_cula: "0",
      image: "/images/not_sure.png",
      id: "q10",
      value: "Jumlah Cula",
    },
  ]);

  const [mammalsCandidateId, setMammalsCandidateId] = React.useState(0);

  const [mammalsCandidateDetail, setMammalsCandidateDetail] = React.useState(
    []
  );

  const [mammalsStatus, setMammalsStatus] = React.useState([{}, {}]);

  const [mammalsImages, setMammalsImages] = React.useState([{}]);

  const [mammalsPlaceOrigin, setMammalsPlaceOrigin] = React.useState([]);

  function onUpdateItem(props) {
    console.log(props);
    console.log("index to change :" + questionIndex);
    let tmpArrayDefault = mammalsValue.map((item, j) => {
      if (questionIndex === j) {
        return props;
      } else {
        return item;
      }
    });

    console.log(tmpArrayDefault);
    setMammalsValue(tmpArrayDefault);
  }
  useEffect(() => {
    if (mammalsCandidateId !== 0) {
      GetMammalsDetail(mammalsCandidateId).then((result) => {
        setMammalsCandidateDetail(result.mammals.animal);
        setMammalsStatus(result.status_mammals);
        setMammalsImages(result.images);
        setMammalsPlaceOrigin(result.place_origin);
      });
    }
  }, [mammalsValue, mammalsCandidateId]);
  return (
    <>
      <Meta
        title="Mammals Identification"
        description="Mammals Identification"
      />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container style={{ width: "340px" }} justify="center" spacing={2}>
          {mammalsCandidateId !== 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <img
                    className={classes.banner}
                    src={
                      process.env.PUBLIC_URL + "/images/protected_wildlife.png"
                    }
                    alt="Mammals"
                  />
                </Grid>
                {mammalsImages.length === 0 ? (
                  <img
                    className={classes.banner}
                    src={process.env.PUBLIC_URL + "/images/placeholder.png"}
                    alt="Mammals"
                  />
                ) : (
                  <img
                    className={classes.bannerImage}
                    src={
                      "https://117.53.47.76/storage/uploaded_images/mammals/" +
                      mammalsImages[0].images
                    }
                    alt="Mammals"
                    onClick={() => {
                      handleClickOpenPhoto();
                    }}
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {mammalsCandidateDetail !== undefined && (
                  // <ReactJson src={mammalsCandidateId} />
                  <Typography>
                    <Box fontStyle="italic">
                      {mammalsCandidateDetail.scientific_name}
                    </Box>
                  </Typography>
                )}
              </Grid>
              <Grid container justify="center">
                {mammalsCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Status (IUCN/CITES)
                      </Typography>
                      <Grid item>
                        <Typography>IUCN : {mammalsStatus[0].iucn}</Typography>
                        <Typography>
                          CITES : {mammalsStatus[1].cites}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Type
                      </Typography>
                      {mammalsPlaceOrigin.map((value) => {
                        return (
                          <Typography>{value.habitatType_name}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Habitat Characteristics
                      </Typography>
                      {mammalsPlaceOrigin.map((value) => {
                        return (
                          <Typography>{value.habitatType_character}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid container>
                      <Typography variant="h6" className={classes.yellow}>
                        Location/Distribution
                      </Typography>
                    </Grid>
                    {/* <ReactJson src={mammalsPlaceOrigin} /> */}
                  </Grid>
                )}
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    setMammalsCandidateId(0);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : mammalsResult.length > 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h5" className={classes.main}>
                    Kandidat Mammals
                  </Typography>
                </Grid>

                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/mammals-light.png"}
                  alt="Mammals"
                />
              </Grid>
              {mammalsResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.mammals_ID}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          console.log(value);
                          console.log(value.mammals_ID);
                          setMammalsCandidateId(value.mammals_ID);
                          // history.push("/identification/mammals/" + value.mammals_ID);
                        }}
                      >
                        <CardContent>
                          <img
                            className={classes.placeholder}
                            src={process.env.PUBLIC_URL + value.image}
                            alt="Mammals"
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
                    setMammalsResult([]);
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
                    Identifikasi Mammals
                  </Typography>
                </Grid>
                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/mammals-light.png"}
                  alt="Mammals"
                />
              </Grid>

              {mammalsValue.map((value, index) => {
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
                            alt="Mammals"
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
                    setMammalsValue(initialState);
                  }}
                  variant="contained"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    let queryParams = "";
                    let tmpQueryParams = mammalsValue;

                    tmpQueryParams.forEach(
                      (object) =>
                        (queryParams +=
                          Object.values(object)[0].toString() + ".")
                    );
                    if (queryParams === "0.0.0.0.0.0.0.0.0.0.")
                      alert("Berikan 1 ciri-ciri");
                    else {
                      localStorage.setItem("query", queryParams);
                      GetMammalsResult(queryParams).then((result) => {
                        if (result.length === 0) {
                          alert("Kandidat tidak ditemukan");
                        } else {
                          setMammalsResult(result);
                        }
                      });
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
            questionProps={mammalsValue[questionIndex]}
            animalType="mammals"
          />

          <DetailPhoto
            isVisible={openPhoto}
            onClose={handleClosePhoto}
            photoProps={mammalsImages[0]}
            animalType="mammals"
          />
        </Grid>
      </Container>
    </>
  );
}

export default MammalsIdentificationPage;
