import React from "react";

import { TextField, Button } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

function ColorSelection({ questionFields, onClose, onUpdateItem, animalType }) {
  const [marginBottom, setMarginBottom] = React.useState(20);
  console.log(animalType);
  return (
    <>
      <Autocomplete
        freeSolo
        options={questionFields}
        onChange={(event, newValue) => {
          onUpdateItem(newValue);
          onClose();
        }}
        onFocus={() => {
          setMarginBottom(350);
        }}
        getOptionLabel={(option) => option.value}
        style={{ width: 250, marginBottom: marginBottom }}
        renderInput={(params) => (
          <TextField {...params} label="Pilihan Warna" variant="outlined" />
        )}
      />
      <Button
        variant="outlined"
        style={{ marginBottom: 10 }}
        onClick={() => {
          if (animalType === "aves") {
            onUpdateItem({
              warna_ID: "0",
              id: "q3",
              image: "/images/aves_icon/aves_icon_warnadominan.jpg",
              value: "Hapus Pilihan",
            });
          } else if (animalType === "herpetofauna") {
            onUpdateItem({
              warna_herpeto_ID: "0",
              image: "/images/not_sure_100.png",
              id: "q8",
              value: "Warna Dominan",
            });
          }

          onClose();
        }}
      >
        Hapus Pilihan
      </Button>
    </>
  );
}

export default ColorSelection;
