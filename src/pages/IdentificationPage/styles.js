import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "justify-content": "start",
    "align-items": "center",
    height: "100%",
    marginTop: "100px",
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "red",
  },
  main: {
    fontWeight: "bold",
    color: "#056D3B",
    textTransform: "capitalize",
  },
  subtitle: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  cardContainer: {
    // width: "100%",
    height: "110px",
    overflow: "hidden",
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#056D3B",
  },
  titleImage: {
    height: "170px",
    marginTop: "-100px",
  },
  card: {
    height: "110px",
  },
}));

export default useStyles;
