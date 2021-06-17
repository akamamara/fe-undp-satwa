import React, { useEffect } from "react";
import useStyles from "./styles";
import moment from "moment";

import Image from "material-ui-image";

import { Container, Button, Typography, Dialog } from "@material-ui/core";

// import { useHistory } from "react-router-dom";

function DetailPhoto({ photoProps, isVisible, onClose, animalType }) {
  // const history = useHistory();
  const classes = useStyles();
  useEffect(() => {}, []);
  return (
    <Container className={classes.root}>
      <Dialog open={isVisible} onClose={onClose} fullWidth>
        <Button
          onClick={() => {
            console.log(photoProps);
          }}
        ></Button>
        {animalType === "aves" ? (
          <Image
            src={
              "http://117.53.47.76/html/Satwa/public/storage/uploaded_images/aves/" +
              photoProps.images
            }
          />
        ) : animalType === "herpetofauna" ? (
          <Image
            src={
              "http://117.53.47.76/html/Satwa/public/storage/uploaded_images/herpetofauna/" +
              photoProps.images
            }
          />
        ) : (
          <Image
            src={
              "http://117.53.47.76/html/Satwa/public/storage/uploaded_images/mammals/" +
              photoProps.images
            }
          />
        )}

        <Typography>Image Title : {photoProps.image_title} </Typography>
        <Typography>Description : {photoProps.description}</Typography>
        <Typography>
          Contributor Name : {photoProps.contributor_name}
        </Typography>
        <Typography>
          Upload Date : {moment(photoProps.uploadDate).format("LLL")}
        </Typography>
      </Dialog>
    </Container>
  );
}

export default DetailPhoto;
