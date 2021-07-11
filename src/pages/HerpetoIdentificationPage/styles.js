import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "justify-content": "start",
    "align-items": "center",
    flexDirection: "column",
  },
  main: {
    width: "190px",
    fontWeight: "bold",
    color: "#056D3B",
    textTransform: "capitalize",
  },
  subtitle: {
    marginBottom: "-10px",
    textTransform: "capitalize",
    color: "white",
  },
  titleImage: {
    height: "90px",
    marginTop: "-30px",
  },
  placeholder: {
    height: "50px",
    alignSelf: "center",
  },
  card: {
    height: "110px",
  },
  banner: {
    width: "200px",
  },
  bannerImage: {
    width: "270px",
    borderLeft: "20px solid #FFC000",
    // backgroundColor: "FFC000",
  },
  yellow: {
    color: "#FFC000",
  },
  backButton: {
    marginTop: "10px",
  },
}));

export default useStyles;
