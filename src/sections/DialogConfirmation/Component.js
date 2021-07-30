import React, { useEffect } from "react";
import useStyles from "./styles";

import {
  Container,
  Grid,
  Typography,
  Dialog,
  // Select,
  // MenuItem,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  DialogTitle,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import fetchAvesQuestion from "../../utils/apis/fetchAvesQuestion";
import fetchHerpetoQuestion from "../../utils/apis/fetchHerpetoQuestion";
import fetchMammalsQuestion from "../../utils/apis/fetchMammalsQuestion";

import translateRaw from "../../utils/translateRaw";

// import { useHistory } from "react-router-dom";

function DialogConfirmation({
  questionProps,
  isVisible,
  onClose,
  onUpdateItem,
  animalType,
}) {
  // const history = useHistory();
  const classes = useStyles();
  const [questionGrid, setQuestionGrid] = React.useState(6);
  const [questionFields, setQuestionFields] = React.useState([]);
  useEffect(() => {
    if (questionProps !== undefined) {
      setQuestionFields([]);
      if (isVisible === true) {
        if (animalType === "aves") {
          fetchAvesQuestion(questionProps.id).then((result) => {
            // console.log(result);
            if (result.length === undefined) {
              console.log(result);
            }
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);

            if (result[0].ukuran_tubuh_ID > 0) {
              setQuestionFields(result);
            } else {
              let sorted = result;
              const after = sorted.sort((a, b) => (a.value < b.value ? -1 : 1));
              console.log(after);
              setQuestionFields(after);
            }

            setQuestionFields(result);
            console.log(result);
          });
        } else if (animalType === "herpetofauna") {
          fetchHerpetoQuestion(questionProps.id).then((result) => {
            // console.log(result);
            if (result.length === undefined) {
              console.log(result);
            }
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);

            if (result[0].ukuran_tubuh_herpeto_ID > 0) {
              setQuestionFields(result);
            } else {
              let sorted = result;
              const after = sorted.sort((a, b) => (a.value < b.value ? -1 : 1));
              console.log(after);
              setQuestionFields(after);
            }
          });
        } else if (animalType === "mammals") {
          fetchMammalsQuestion(questionProps.id).then((result) => {
            if (result.length === undefined) {
              console.log(result);
            }
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);

            setQuestionFields(result);
            console.log(result);
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [questionProps, isVisible]);
  return (
    <Container className={classes.root}>
      <Dialog open={isVisible} onClose={onClose} fullWidth>
        {questionProps !== undefined && (
          <DialogTitle className={classes.title}>
            Identifikasi {translateRaw(Object.keys(questionProps))}
          </DialogTitle>
        )}

        <Grid container justify="center" alignItems="center">
          {questionFields.map((value) => {
            if (value.length < 4) {
              console.log("12");
            }
            return (
              <Grid
                item
                xs={questionGrid}
                key={value.value}
                style={{
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {value.warna_ID !== undefined ? (
                  <Card style={{}}>
                    <CardActionArea
                      onClick={() => {
                        console.log(questionProps);
                        value.id = questionProps.id;
                        console.log(value);
                        onUpdateItem(value);
                        setQuestionFields([]);
                        onClose();
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.subtitle}>
                          {value.value !== ""
                            ? value.value
                            : translateRaw(Object.keys(value))}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : value.warna_herpeto_ID !== undefined ? (
                  <Card>
                    <CardActionArea
                      onClick={() => {
                        console.log("herpeto_id");
                        console.log(questionProps);
                        value.id = questionProps.id;
                        console.log(value);
                        onUpdateItem(value);
                        setQuestionFields([]);
                        onClose();
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.subtitle}>
                          {value.value !== ""
                            ? value.value
                            : translateRaw(Object.keys(value))}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : value.keberadaan_kaki !== undefined ? (
                  <Card style={{}}>
                    <CardActionArea
                      onClick={() => {
                        console.log("keberadaan_kaki");
                        console.log(questionProps);
                        value.id = questionProps.id;
                        console.log(value);
                        onUpdateItem(value);
                        setQuestionFields([]);
                        onClose();
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.subtitle}>
                          {value.value !== ""
                            ? value.value
                            : translateRaw(Object.keys(value))}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : (
                  <Card style={{}}>
                    <CardActionArea
                      onClick={() => {
                        console.log(questionProps);
                        value.id = questionProps.id;
                        console.log(value);
                        onUpdateItem(value);
                        setQuestionFields([]);
                        onClose();
                      }}
                    >
                      {value.icon !== undefined ? (
                        <CardMedia
                          style={{
                            height: 0,
                            paddingTop: "56.25%", // 16:9,
                            marginTop: "30",
                            borderLeft: "10px solid #FFC000",
                          }}
                          image={"https://the-next-project.my.id/" + value.icon}
                        />
                      ) : (
                        <img
                          className={classes.placeholder}
                          // src={process.env.PUBLIC_URL + value.image}
                          src={
                            process.env.PUBLIC_URL + "/images/placeholder.png"
                          }
                          alt="Aves"
                        />
                      )}
                      {value.value !== "" ? (
                        <Typography
                          style={{
                            position: "absolute",
                            top: "83%",
                            width: "100%",
                            textAlign: "left",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            fontSize: "0.75rem",
                            padding: "5px 0px 20px 10px",
                          }}
                        >
                          {value.value}
                        </Typography>
                      ) : (
                        <Typography
                          style={{
                            position: "absolute",
                            // top: "65%",
                            width: "100%",
                            textAlign: "left",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            fontSize: "0.75rem",
                            padding: "5px 0px 20px 10px",
                          }}
                        >
                          {translateRaw(Object.keys(value))}
                        </Typography>
                      )}
                    </CardActionArea>
                  </Card>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Dialog>
    </Container>
  );
}

export default DialogConfirmation;
