import React from "react";
import useStyles from "./styles";
import moment from "moment";

import Image from "material-ui-image";

import { Grid, Container, Typography, Dialog } from "@material-ui/core";

function DetailPhoto({ photoProps, isVisible, onClose, animalType }) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Dialog open={isVisible} onClose={onClose} fullWidth>
        <Image
          src={
            "https://satwa.menlhk.go.id/storage/uploaded_images/" +
            animalType +
            "/" +
            photoProps.images
          }
          cover
        />
        <Grid container style={{ padding: "10px" }}>
          <Grid item xs={12}>
            <Typography>Image Title : {photoProps.image_title} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Description : {photoProps.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Contributor Name : {photoProps.contributor_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Upload Date : {moment(photoProps.uploadDate).format("LLL")}
            </Typography>
          </Grid>
        </Grid>
      </Dialog>
    </Container>
  );
}

export default DetailPhoto;
