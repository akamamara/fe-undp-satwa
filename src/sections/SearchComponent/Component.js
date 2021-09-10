import React from "react";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

function SearchComponent(props) {
  const {
    onQueryStringChanged,
    onQueryTypeChanged,
    onClickSearch,
    queryString,
    queryType,
    animalType,
  } = props;
  return (
    <Grid container justify="space-evenly">
      <TextField
        placeholder={
          "Cari nama " + (animalType === "mammals" ? "Mamalia" : animalType)
        }
        variant="outlined"
        size="small"
        value={queryString}
        onChange={(newValue) => {
          onQueryStringChanged(newValue.target.value);
        }}
      />
      <Button
        size="small"
        variant="contained"
        onClick={onClickSearch}
        disabled={queryString.length === 0}
      >
        Cari
      </Button>
      <FormControl>
        <RadioGroup
          row
          defaultValue={queryType}
          onChange={(newValue) => {
            onQueryTypeChanged(newValue.target.value);
          }}
        >
          <FormControlLabel
            value="0"
            control={<Radio color="primary" size="small" />}
            label="Nama saintifik"
          />
          <FormControlLabel
            value="1"
            control={<Radio color="primary" size="small" />}
            label="Nama umum"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}

export default SearchComponent;
