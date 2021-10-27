import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
import Carousel from "react-material-ui-carousel";
import GetHerpetoResult from "../../utils/apis/GetHerpetoResult";
import GetHerpetoSearch from "../../utils/apis/GetHerpetoSearch";
import GetHerpetoDetail from "../../utils/apis/GetHerpetoDetail";
import translateRaw from "../../utils/translateRaw";
import DialogConfirmation from "../../sections/DialogConfirmation";
import SearchComponent from "../../sections/SearchComponent";
import CarouselPhoto from "../../sections/CarouselPhoto";
import AlertPopup from "../../sections/Alert";

import Meta from "components/Meta";
import useStyles from "./styles";

function HerpetoIdentificationPage() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [queryString, setQueryString] = React.useState("");
  const [queryType, setQueryType] = React.useState("0");
  const [alertString, setAlertString] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const [herpetoResult, setHerpetoResult] = React.useState([]);
  const initialState = [
    {
      jenis_hewan_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS HEWAN.jpg",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      jenis_sisik_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS SISIK.jpg",
      id: "q2",
      value: "Jenis Sisik",
    },
    {
      bentuk_kaki_ID: "0",
      image: "/images/herpetofauna_icon/ICON_BENTUK KAKI.jpg",
      id: "q3",
      value: "Bentuk Kaki",
    },
    {
      ukuran_tubuh_herpeto_ID: "0",
      image: "/images/herpetofauna_icon/ICON_UKURAN TUBUH.jpg",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      jenis_moncong_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS MONCONG.jpg",
      id: "q5",
      value: "Jenis Moncong",
    },
    {
      jenis_tempurung_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS TEMPURUNG.jpg",
      id: "q6",
      value: "Jenis Tempurung",
    },
    {
      jenis_ekor_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS EKOR.jpg",
      id: "q7",
      value: "Jenis Ekor (Khusus Biawak)",
    },
    {
      warna_herpeto_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q8",
      value: "Warna Dominan",
    },
    {
      has_kaki_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q9",
      value: "Berkaki?",
    },
  ];
  const [herpetoValue, setHerpetoValue] = React.useState([
    {
      jenis_hewan_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS HEWAN.jpg",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      jenis_sisik_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS SISIK.jpg",
      id: "q2",
      value: "Jenis Sisik",
    },
    {
      bentuk_kaki_ID: "0",
      image: "/images/herpetofauna_icon/ICON_BENTUK KAKI.jpg",
      id: "q3",
      value: "Bentuk Kaki",
    },
    {
      ukuran_tubuh_herpeto_ID: "0",
      image: "/images/herpetofauna_icon/ICON_UKURAN TUBUH.jpg",
      id: "q4",
      value: "Ukuran Tubuh",
    },
    {
      jenis_moncong_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS MONCONG.jpg",
      id: "q5",
      value: "Jenis Moncong",
    },
    {
      jenis_tempurung_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS TEMPURUNG.jpg",
      id: "q6",
      value: "Jenis Tempurung",
    },
    {
      jenis_ekor_ID: "0",
      image: "/images/herpetofauna_icon/ICON_JENIS EKOR.jpg",
      id: "q7",
      value: "Jenis Ekor (Khusus Biawak)",
    },
    {
      warna_herpeto_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q8",
      value: "Warna Dominan",
    },
    {
      has_kaki_ID: "0",
      image: "/images/not_sure_100.png",
      id: "q9",
      value: "Berkaki?",
    },
  ]);

  const [herpetoCandidateId, setHerpetoCandidateId] = React.useState(0);

  const [herpetoCandidateDetail, setHerpetoCandidateDetail] = React.useState(
    []
  );

  const [herpetoStatus, setHerpetoStatus] = React.useState([{}, {}]);

  const [herpetoImages, setHerpetoImages] = React.useState([{}]);
  // eslint-disable-next-line no-unused-vars
  const [herpetoPlaceOrigin, setHerpetoPlaceOrigin] = React.useState([]);

  const [herpetoIndonesianName, setHerpetoIndonesianName] = React.useState([
    {},
  ]);

  const [herpetoEnglishName, setHerpetoEnglishName] = React.useState([{}]);
  const [herpetoArea, setHerpetoArea] = React.useState([]);

  function onUpdateItem(props) {
    console.log("index to change : " + questionIndex);
    console.log(props);
    let tmpArrayDefault = herpetoValue.map((item, j) => {
      if (questionIndex === j) {
        if (props.warna_herpeto_ID === "0") {
          delete props.icon;
          props.value = "Warna Dominan";
        } else if (props.icon === undefined) {
          props.icon = "";
        }
        props.id = item.id;
        return props;
      } else {
        return item;
      }
    });

    console.log(tmpArrayDefault);
    setHerpetoValue(tmpArrayDefault);
  }

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (herpetoCandidateId !== 0) {
      console.log("balik ke kandidat");
      setHerpetoCandidateId(0);
    } else if (herpetoResult.length > 0) {
      console.log("balik ke identifikasi ciri");
      setHerpetoResult([]);
    } else if (herpetoResult.length === 0) {
      console.log("balik ke spesies");
      history.push("/identification");
      setHerpetoResult([]);
    } else {
      console.log("null");
    }
  };

  useEffect(() => {
    if (herpetoCandidateId !== 0) {
      GetHerpetoDetail(herpetoCandidateId).then((result) => {
        console.log(result);
        setHerpetoCandidateDetail(result.herpetofauna.animal);
        setHerpetoStatus(result.status_herpetofauna);
        setHerpetoImages(result.images);
        setHerpetoPlaceOrigin(result.place_origin);
        setHerpetoIndonesianName(result.indonesian_name);
        setHerpetoEnglishName(result.english_name);
        setHerpetoArea(result.area[0]);
      });
    }
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
    // eslint-disable-next-line
  }, [herpetoValue, herpetoCandidateId, herpetoResult]);
  return (
    <>
      <Meta
        title="Identifikasi Herpetofauna"
        description="Identifikasi Herpetofauna"
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
                      process.env.PUBLIC_URL +
                      "/images/satwa_dilindungi_red.png"
                    }
                    alt="Herpetofauna"
                  />
                </Grid>
                {herpetoImages.length === 0 ? (
                  <img
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Herpetofauna"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                ) : herpetoImages[0].images !== undefined ? (
                  <Carousel autoPlay={false} navButtomAlwaysVisible>
                    {herpetoImages.map((item, i) => (
                      <CarouselPhoto
                        key={i}
                        item={item}
                        animalType="herpetofauna"
                      />
                    ))}
                  </Carousel>
                ) : (
                  <img
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Herpetofauna"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {herpetoCandidateDetail !== undefined && (
                  <Box>
                    {herpetoIndonesianName &&
                      herpetoIndonesianName.map((value) => {
                        return (
                          <Typography
                            align="center"
                            key={value.indonesian_name}
                          >
                            {value.indonesian_name}
                          </Typography>
                        );
                      })}
                    <Box fontStyle="italic">
                      {herpetoEnglishName &&
                        herpetoEnglishName.map((value) => {
                          return (
                            <Typography
                              align="center"
                              fontStyle="italic"
                              key={value.english_name}
                            >
                              {value.english_name}
                            </Typography>
                          );
                        })}
                    </Box>

                    <Box fontStyle="italic">
                      <Typography align="center">
                        {herpetoCandidateDetail.scientific_name}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid container justify="center">
                {herpetoCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6" className={classes.yellow}>
                          Status (IUCN/CITES)
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography>IUCN : {herpetoStatus[0].iucn}</Typography>
                        <Typography>
                          CITES : {herpetoStatus[1].cites}
                        </Typography>
                      </Grid>
                    </Grid>
                    {herpetoArea !== undefined && (
                      <>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h6" className={classes.yellow}>
                              Habitat Type
                            </Typography>
                            <Typography>{herpetoArea.habitat_type}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Typography variant="h6" className={classes.yellow}>
                              Location/Distribution
                            </Typography>
                            <Typography>{herpetoArea.area}</Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid className={classes.backButton}>
                <Button
                  onClick={() => {
                    setHerpetoCandidateId(0);
                    setHerpetoImages([{}]);
                  }}
                  variant="contained"
                >
                  Kembali
                </Button>
              </Grid>
            </>
          ) : herpetoResult.length > 0 ? (
            <>
              <Grid container justify="center">
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
                {queryString && (
                  <Typography>
                    Hasil pencarian "{queryString}" pada{" "}
                    {queryType === "0" ? "Nama saintifik" : "Nama umum"}
                  </Typography>
                )}
              </Grid>
              {herpetoResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.herpetofauna_ID}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          console.log(value);
                          setHerpetoCandidateId(value.herpetofauna_ID);
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
                              // paddingTop: "56.25%",
                              borderLeft: "10px solid #FFC000",
                            }}
                            image={
                              "https://satwa.menlhk.go.id/storage/uploaded_images/herpetofauna/" +
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
              <SearchComponent
                queryString={queryString}
                queryType={queryType}
                animalType="Herpetofauna"
                onQueryStringChanged={(newValue) => {
                  setQueryString(newValue);
                }}
                onQueryTypeChanged={(newValue) => {
                  setQueryType(newValue);
                }}
                onClickSearch={() => {
                  console.log(queryString);
                  console.log(queryType);
                  GetHerpetoSearch(queryString, queryType).then((result) => {
                    console.log(result);
                    if (result.length === 0) {
                      setAlertString(
                        "Kandidat dengan nama tersebut, tidak termasuk satwa yang dilindungi"
                      );
                      setAlertOpen(true);
                    } else {
                      setHerpetoResult(result);
                    }
                  });
                }}
              />
              {herpetoValue.map((value, index) => {
                return (
                  <Grid item xs={6} key={Object.keys(value)}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          setQuestionIndex(index);
                          handleClickOpen();
                        }}
                      >
                        {value.icon !== undefined ? (
                          <CardMedia
                            style={{
                              height: "120px",
                              borderLeft: "10px solid #FFC000",
                            }}
                            image={"https://satwa.menlhk.go.id/" + value.icon}
                          />
                        ) : (
                          <CardMedia
                            style={{
                              height: "120px",
                              // paddingTop: "56.25%",
                              borderLeft: "10px solid #FFC000",
                              filter: "brightness(50%)",
                            }}
                            image={process.env.PUBLIC_URL + value.image}
                          />
                        )}

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
                      setHerpetoValue(initialState);
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
                      let tmpQueryParams = herpetoValue;

                      tmpQueryParams.forEach(
                        (object) =>
                          (queryParams +=
                            Object.values(object)[0].toString() + ".")
                      );
                      if (queryParams === "0.0.0.0.0.0.0.0.0.") {
                        setAlertString("Berikan 1 ciri-ciri!");
                        setAlertOpen(true);
                      } else {
                        localStorage.setItem("query", queryParams);
                        console.log(queryParams);
                        GetHerpetoResult(queryParams)
                          .then((result) => {
                            if (result.length === 0) {
                              setAlertString(
                                "Periksa kembali ciri-ciri yang Anda pilih. Apabila sudah benar, kandidat dengan ciri-ciri tersebut tidak termasuk satwa yang dilindungi menurut Permen LHK"
                              );
                              setAlertOpen(true);
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
              </Grid>
            </>
          )}

          <DialogConfirmation
            isVisible={open}
            onClose={handleClose}
            onUpdateItem={onUpdateItem}
            questionProps={herpetoValue[questionIndex]}
            animalType="herpetofauna"
          />
          <AlertPopup
            string={alertString}
            open={alertOpen}
            onClose={handleCloseAlert}
          />
        </Grid>
      </Container>
    </>
  );
}

export default HerpetoIdentificationPage;
