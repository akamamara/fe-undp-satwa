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
import GetMammalsResult from "../../utils/apis/GetMammalsResult";
import GetMammalsSearch from "../../utils/apis/GetMammalsSearch";
import GetMammalsDetail from "../../utils/apis/GetMammalsDetail";
import translateRaw from "../../utils/translateRaw";
import DialogConfirmation from "../../sections/DialogConfirmation";
import AlertPopup from "../../sections/Alert";
import SearchComponent from "../../sections/SearchComponent";
import CarouselPhoto from "../../sections/CarouselPhoto";

import Meta from "components/Meta";
import useStyles from "./styles";

function MammalsIdentificationPage() {
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

  const [mammalsResult, setMammalsResult] = React.useState([]);
  const initialState = [
    {
      tipe_mammals_ID: "0",
      image: "/images/mammals_icon/ICON_JENIS SATWA.jpg",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      alat_gerak_ID: "0",
      image: "/images/mammals_icon/ICON_ALAT GERAK.jpg",
      id: "q2",
      value: "Alat Gerak",
    },
    {
      third_attribute_ID: "0",
      image: "/images/mammals_icon/ICON_CIRI FISIK UTAMA.jpg",
      id: "q3",
      value: "Ciri Fisik Utama",
    },
    {
      jenis_kulit_ID: "0",
      image: "/images/mammals_icon/ICON_JENIS KULIT.jpg",
      id: "q4",
      value: "Jenis Kulit",
    },
    {
      ukuran_tubuh_mammals_ID: "0",
      image: "/images/mammals_icon/ICON_UKURAN TUBUH.jpg",
      id: "q5",
      value: "Ukuran Tubuh",
    },
    {
      bertanduk_bertaring_ID: "0",
      image: "/images/mammals_icon/ICON_BERANGGAH ATAU BERTARING.jpg",
      id: "q6",
      value: "Bertanduk/Bertaring",
    },
    {
      has_moncong: "0",
      image: "/images/mammals_icon/ICON_MEMPUNYAI MONCONG.jpg",
      id: "q7",
      value: "Mempunyai Moncong",
    },
    {
      has_ekor: "0",
      image: "/images/mammals_icon/ICON_MEMPUNYAI EKOR.jpg",
      id: "q8",
      value: "Mempunyai Ekor",
    },
    {
      jumlah_kuku: "0",
      image: "/images/mammals_icon/ICON_JUMLAH KUKU.jpg",
      id: "q9",
      value: "Jumlah Kuku",
    },
    {
      jumlah_cula: "0",
      image: "/images/mammals_icon/ICON_JUMLAH CULA.jpg",
      id: "q10",
      value: "Jumlah Cula",
    },
  ];
  const [mammalsValue, setMammalsValue] = React.useState([
    {
      tipe_mammals_ID: "0",
      image: "/images/mammals_icon/ICON_JENIS SATWA.jpg",
      id: "q1",
      value: "Jenis Hewan",
    },
    {
      alat_gerak_ID: "0",
      image: "/images/mammals_icon/ICON_ALAT GERAK.jpg",
      id: "q2",
      value: "Alat Gerak",
    },
    {
      third_attribute_ID: "0",
      image: "/images/mammals_icon/ICON_CIRI FISIK UTAMA.jpg",
      id: "q3",
      value: "Ciri Fisik Utama",
    },
    {
      jenis_kulit_ID: "0",
      image: "/images/mammals_icon/ICON_JENIS KULIT.jpg",
      id: "q4",
      value: "Jenis Kulit",
    },
    {
      ukuran_tubuh_mammals_ID: "0",
      image: "/images/mammals_icon/ICON_UKURAN TUBUH.jpg",
      id: "q5",
      value: "Ukuran Tubuh",
    },
    {
      bertanduk_bertaring_ID: "0",
      image: "/images/mammals_icon/ICON_BERANGGAH ATAU BERTARING.jpg",
      id: "q6",
      value: "Bertanduk/Bertaring",
    },
    {
      has_moncong: "0",
      image: "/images/mammals_icon/ICON_MEMPUNYAI MONCONG.jpg",
      id: "q7",
      value: "Mempunyai Moncong",
    },
    {
      has_ekor: "0",
      image: "/images/mammals_icon/ICON_MEMPUNYAI EKOR.jpg",
      id: "q8",
      value: "Mempunyai Ekor",
    },
    {
      jumlah_kuku: "0",
      image: "/images/mammals_icon/ICON_JUMLAH KUKU.jpg",
      id: "q9",
      value: "Jumlah Kuku",
    },
    {
      jumlah_cula: "0",
      image: "/images/mammals_icon/ICON_JUMLAH CULA.jpg",
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
  // eslint-disable-next-line no-unused-vars
  const [mammalsPlaceOrigin, setMammalsPlaceOrigin] = React.useState([]);

  const [mammalsIndonesianName, setMammalsIndonesianName] = React.useState([]);
  const [mammalsEnglishName, setMammalsEnglishName] = React.useState([]);
  const [mammalsArea, setMammalsArea] = React.useState([{}]);

  function onUpdateItem(props) {
    console.log("index to change : " + questionIndex);
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

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (mammalsCandidateId !== 0) {
      console.log("balik ke kandidat");
      setMammalsCandidateId(0);
    } else if (mammalsResult.length > 0) {
      console.log("balik ke identifikasi ciri");
      setMammalsResult([]);
    } else if (mammalsResult.length === 0) {
      console.log("balik ke spesies");
      history.push("/identification");
      setMammalsResult([]);
    } else {
      console.log("null");
    }
  };
  useEffect(() => {
    if (mammalsCandidateId !== 0) {
      GetMammalsDetail(mammalsCandidateId).then((result) => {
        setMammalsCandidateDetail(result.mammals.animal);
        setMammalsStatus(result.status_mammals);
        setMammalsImages(result.images);
        setMammalsPlaceOrigin(result.place_origin);
        setMammalsIndonesianName(result.indonesian_name);
        setMammalsEnglishName(result.english_name);
        setMammalsArea(result.area[0]);
      });
    }

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
    // eslint-disable-next-line
  }, [mammalsValue, mammalsCandidateId, mammalsResult]);
  return (
    <>
      <Meta title="Identifikasi Mamalia" description="Identifikasi Mamalia" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container style={{ width: "340px" }} justify="center" spacing={2}>
          {mammalsCandidateId !== 0 ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <img
                    className={classes.banner}
                    src={
                      process.env.PUBLIC_URL +
                      "/images/satwa_dilindungi_red.png"
                    }
                    alt="Mammals"
                  />
                </Grid>
                {mammalsImages.length === 0 ? (
                  <img
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Mammals"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                ) : mammalsImages[0].images !== undefined ? (
                  <Carousel autoPlay={false} navButtomAlwaysVisible>
                    {mammalsImages.map((item, i) => (
                      <CarouselPhoto key={i} item={item} animalType="mammals" />
                    ))}
                  </Carousel>
                ) : (
                  <img
                    style={{
                      backgroundColor: "green",
                      borderLeft: "10px solid #FFC000",
                    }}
                    alt="Mammals"
                    src={process.env.PUBLIC_URL + "/images/not_sure_100.png"}
                    onClick={() => {
                      console.log("im empty");
                    }}
                  />
                )}
              </Grid>

              <Grid container justify="center">
                {mammalsCandidateDetail !== undefined && (
                  <Box>
                    {mammalsIndonesianName &&
                      mammalsIndonesianName.map((value) => {
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
                      {mammalsEnglishName &&
                        mammalsEnglishName.map((value) => {
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
                        {mammalsCandidateDetail.scientific_name}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid container justify="center">
                {mammalsCandidateDetail !== undefined && (
                  <Grid container>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6" className={classes.yellow}>
                          Status (IUCN/CITES)
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography>IUCN : {mammalsStatus[0].iucn}</Typography>
                        <Typography>
                          CITES : {mammalsStatus[1].cites}
                        </Typography>
                      </Grid>
                    </Grid>
                    {mammalsArea !== undefined && (
                      <>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h6" className={classes.yellow}>
                              Habitat Type
                            </Typography>
                          </Grid>

                          <Typography>{mammalsArea.habitat_type}</Typography>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h6" className={classes.yellow}>
                              Location/Distribution
                            </Typography>
                            <Typography>{mammalsArea.area}</Typography>
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
                    Kandidat Mamalia
                  </Typography>
                </Grid>

                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/mammals-light.png"}
                  alt="Mamalia"
                />
              </Grid>
              {mammalsResult.map((value) => {
                return (
                  <Grid item xs={6} key={value.mammals_ID}>
                    <Card style={{ backgroundColor: "green" }}>
                      <CardActionArea
                        onClick={() => {
                          console.log(value);
                          setMammalsCandidateId(value.mammals_ID);
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
                              "https://satwa.menlhk.go.id/storage/uploaded_images/mammals/" +
                              value.images.images
                            }
                          />
                        )}
                        {value.scientific_name.length > 23 ? (
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
                    Identifikasi Mamalia
                  </Typography>
                </Grid>
                <img
                  className={classes.titleImage}
                  src={process.env.PUBLIC_URL + "/images/mammals-light.png"}
                  alt="Mammals"
                />
              </Grid>
              <SearchComponent
                queryString={queryString}
                queryType={queryType}
                animalType="mammals"
                onQueryStringChanged={(newValue) => {
                  setQueryString(newValue);
                }}
                onQueryTypeChanged={(newValue) => {
                  setQueryType(newValue);
                }}
                onClickSearch={() => {
                  console.log(queryString);
                  console.log(queryType);
                  GetMammalsSearch(queryString, queryType).then((result) => {
                    console.log(result);
                    if (result.length === 0) {
                      setAlertString(
                        "Kandidat dengan nama tersebut, tidak termasuk satwa yang dilindungi"
                      );
                      setAlertOpen(true);
                    } else {
                      setMammalsResult(result);
                    }
                  });
                }}
              />

              {mammalsValue.map((value, index) => {
                return (
                  <Grid item xs={6} key={Object.keys(value)}>
                    <Card style={{}}>
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
                              filter: "brightness(60%)",
                            }}
                            image={process.env.PUBLIC_URL + value.image}
                          />
                        )}

                        {value.value.length > 19 ? (
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
                      setMammalsValue(initialState);
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
                      let tmpQueryParams = mammalsValue;

                      tmpQueryParams.forEach(
                        (object) =>
                          (queryParams +=
                            Object.values(object)[0].toString() + ".")
                      );
                      if (queryParams === "0.0.0.0.0.0.0.0.0.0.") {
                        setAlertString("Berikan 1 ciri-ciri!");
                        setAlertOpen(true);
                      } else {
                        localStorage.setItem("query", queryParams);
                        GetMammalsResult(queryParams).then((result) => {
                          if (result.length === 0) {
                            setAlertString(
                              "Periksa kembali ciri-ciri yang Anda pilih. Apabila sudah benar, kandidat dengan ciri-ciri tersebut tidak termasuk satwa yang dilindungi menurut Permen LHK"
                            );
                            setAlertOpen(true);
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

export default MammalsIdentificationPage;
