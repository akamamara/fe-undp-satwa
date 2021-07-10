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
              setQuestionGrid(6);
            } else setQuestionGrid(12);

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
              setQuestionGrid(6);
            } else setQuestionGrid(12);

            setQuestionFields(result);
            console.log(result);
          });
        } else if (animalType === "mammals") {
          fetchMammalsQuestion(questionProps.id).then((result) => {
            // console.log(result);
            if (result.length === undefined) {
              console.log(result);
            }
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(6);
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

        <Grid
          container
          justify="center"
          alignItems="center"
          // spacing={1}
        >
          {questionFields.map((value) => {
            // console.log(value);
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
                  <Card style={{}}>
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
                      <CardContent>
                        <img
                          className={classes.placeholder}
                          // src={process.env.PUBLIC_URL + value.image}
                          src={
                            process.env.PUBLIC_URL + "/images/placeholder.png"
                          }
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
                )}
                {/* {value.warna_ID !== undefined ||
                  (value.warna_herpeto_ID !== undefined && (
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
                  ))} */}
              </Grid>
            );
          })}
        </Grid>
      </Dialog>
    </Container>
  );
}

export default DialogConfirmation;
