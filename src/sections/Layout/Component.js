import React from "react";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
// import Navigation from "sections/Navigation";
// import Notifications from "sections/Notifications";
import Box from "@material-ui/core/Box";

// import Fb from "components/Fb";
import useStyles from "./styles";

function Layout() {
  const classes = useStyles();

  return (
    <>
      {/* <Notifications /> */}
      {/* <Navigation /> */}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content />
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
