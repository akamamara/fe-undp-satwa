import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "align-items": "center",
    height: "100%",
  },
  spacer: theme.mixins.toolbar,
  wrapper: {
    flexGrow: 1,
    height: "100vh",
    overflow: "scroll",
    position: "relative",
  },
  content: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    marginTop: "20px",
    // height: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)`,
  },
  title: {
    textTransform: "capitalize",
  },
  placeholder: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default useStyles;
