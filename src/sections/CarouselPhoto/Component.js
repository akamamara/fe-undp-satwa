import React from "react";
import useStyles from "./styles";
import DetailPhoto from "../../sections/DetailPhoto";

function CarouselPhoto(props) {
  const classes = useStyles();

  const { item, animalType } = props;
  const [openPhoto, setOpenPhoto] = React.useState(false);

  const handleClosePhoto = () => {
    setOpenPhoto(false);
  };

  return (
    <>
      <img
        className={classes.bannerImage}
        alt="Aves"
        src={
          "https://satwa.menlhk.go.id/storage/uploaded_images/" +
          animalType +
          "/" +
          item.images
        }
        onClick={() => {
          setOpenPhoto(true);
        }}
      />
      <DetailPhoto
        isVisible={openPhoto}
        onClose={handleClosePhoto}
        photoProps={item}
        animalType={animalType}
      />
    </>
  );
}

export default CarouselPhoto;
