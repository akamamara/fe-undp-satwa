import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Typography,
  Container,
  Card,
  // CardContent,
  CardActionArea,
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";
import useTheme from "store/theme";

import useMediaQuery from "@material-ui/core/useMediaQuery";

// import { FaReact as ReactIcon } from "react-icons/fa";

import Fb from "components/Fb";
import Meta from "components/Meta";

import useStyles from "./styles";

function Welcome() {
  const matchSmallScreen = useMediaQuery("(max-width: 600px)");
  const classes = useStyles();
  const [, themeActions] = useTheme();

  function themeGoGreen() {
    themeActions.goGreen();
  }
  function themeGoWhite() {
    themeActions.goWhite();
  }

  useEffect(() => {
    themeGoGreen();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta
        title="Identifikasi Satwa"
        description="Halaman identifikasi satwa dilindugi"
      />
      <Container maxWidth="sm" className="full-height">
        <Fb justifyCenter alignCenter className={classes.wrapper}>
          <Typography
            variant={matchSmallScreen ? "h4" : "h3"}
            className={classes.main}
          >
            Identifikasi Satwa
          </Typography>

          <Card className={classes.cardContainer}>
            <CardActionArea
              onClick={themeGoWhite}
              component={RouterLink}
              to="/identification/aves"
            >
              <img
                className={classes.card}
                src={process.env.PUBLIC_URL + "/images/card-aves.png"}
                alt="Card Aves"
              />
            </CardActionArea>
          </Card>

          <Card className={classes.cardContainer}>
            <CardActionArea
              onClick={themeGoWhite}
              component={RouterLink}
              to="/identification/herpetofauna"
            >
              <img
                className={classes.card}
                src={process.env.PUBLIC_URL + "/images/card-herpeto.png"}
                alt="Card Herpeto"
              />
            </CardActionArea>
          </Card>
          <Card className={classes.cardContainer}>
            <CardActionArea
              onClick={themeGoWhite}
              component={RouterLink}
              to="/identification/mammals"
            >
              <img
                className={classes.card}
                src={process.env.PUBLIC_URL + "/images/card-mammals.png"}
                alt="Card Mammals"
              />
            </CardActionArea>
          </Card>
        </Fb>
      </Container>
    </>
  );
}

export default Welcome;
