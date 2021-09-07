import React from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";

function CarouselPhoto(props) {
  const classes = useStyles();

  const { item, i } = props;
  return (
    <Paper
      onClick={() => {
        console.log(item);
      }}
    >
      <img
        className={classes.bannerImage}
        alt="Aves"
        src={
          "https://satwa.menlhk.go.id/storage/uploaded_images/aves/" +
          item.images
        }
        onClick={() => {
          // setImageIndex(i);
          // handleClickOpenPhoto();
        }}
      />
      <p>{i}</p>
    </Paper>
  );
}

export default CarouselPhoto;
