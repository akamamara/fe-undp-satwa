import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    flexDirection: "column",
    "user-select": "none",
    "text-align": "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    color: theme.palette.secondary.main,
  },
  iconBox: {
    width: 50,
    "margin-right": 10,
  },
  main: {
    "font-weight": "100",
  },
  title: {
    "font-weight": "bold",
    color: "#056D3B",
  },

  description: {
    fontStyle: "italic",
    color: "#000",
  },
  card: {
    height: "110px",
  },
  cardContainer: {
    // width: "100%",
    height: "110px",
    overflow: "hidden",
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#056D3B",
  },
}));

export default useStyles;
