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
import ColorSelection from "../../sections/ColorSelection";

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
  const [colorQuestion, setColorQuestion] = React.useState(false);

  useEffect(() => {
    if (questionProps !== undefined) {
      setQuestionFields([]);
      if (isVisible === true) {
        if (animalType === "aves") {
          fetchAvesQuestion(questionProps.id).then((result) => {
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);
            console.log(result);

            if (result[0].warna_ID !== undefined) {
              setColorQuestion(true);
            } else {
              setColorQuestion(false);
            }
            setQuestionFields(result);
          });
        } else if (animalType === "herpetofauna") {
          fetchHerpetoQuestion(questionProps.id).then((result) => {
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);

            if (result[0].warna_herpeto_ID !== undefined) {
              setColorQuestion(true);
            } else {
              setColorQuestion(false);
            }
            setQuestionFields(result);
          });
        } else if (animalType === "mammals") {
          fetchMammalsQuestion(questionProps.id).then((result) => {
            if (result.length <= 3) {
              setQuestionGrid(12);
            } else if (result.length <= 8) {
              setQuestionGrid(12);
            } else setQuestionGrid(12);

            setQuestionFields(result);
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
          {colorQuestion === true ? (
            <ColorSelection
              questionFields={questionFields}
              onClose={onClose}
              onUpdateItem={onUpdateItem}
              animalType={animalType}
            />
          ) : (
            questionFields.map((value) => {
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
                  {value.keberadaan_kaki !== undefined ? (
                    <Card style={{}}>
                      <CardActionArea
                        onClick={() => {
                          value.id = questionProps.id;
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
                          value.id = questionProps.id;
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
                            image={
                              "https://the-next-project.my.id/" + value.icon
                            }
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
            })
          )}
        </Grid>
      </Dialog>
    </Container>
  );
}

export default DialogConfirmation;
