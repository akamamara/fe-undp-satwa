import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    height: "100%",
  },
  main: {
    color: "black",
    fontWeight: "bold",
  },
  titleImage: {
    height: "220px",
    marginBottom: "40px",
  },
  button: { backgroundColor: "green", marginTop: "10px" },
  input: {
    marginBottom: "10px",
  },
}));

export default useStyles;
