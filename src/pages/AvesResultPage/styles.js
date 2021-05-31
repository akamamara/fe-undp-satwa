import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "justify-content": "center",
    "align-items": "center",
    height: "100%",
  },
  titleImage: {
    width: "200px",
  },
}));

export default useStyles;