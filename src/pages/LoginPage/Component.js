import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import {
  // Typography,
  Container,
  Grid,
  Button,
  // Card,
  // CardContent,
  // CardActionArea,
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";

import Meta from "components/Meta";
import InputField from "components/FormFields/InputFields";
import InputPasswordField from "components/FormFields/InputPasswordField";
import AlertPopup from "../../sections/Alert";

import useTheme from "store/theme";

import useStyles from "./styles";

import handleLogin from "../../utils/apis/Login";

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const [alertString, setAlertString] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const [, themeActions] = useTheme();
  function themeGoYellow() {
    themeActions.goYellow();
  }

  useEffect(() => {
    themeGoYellow();
    if (localStorage.getItem("token") !== null) {
      console.log(localStorage.getItem("token"));
      history.replace("/identification");
    }

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Login Page" description="Login Page" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <img
            className={classes.titleImage}
            src={process.env.PUBLIC_URL + "/images/app-logo-title.png"}
            alt="App Logo"
          />
          <Grid item>
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = true;
                } else if (!values.password) {
                  errors.password = true;
                }
                return errors;
              }}
              onSubmit={(values) => {
                setTimeout(() => {
                  console.log(values);
                  handleLogin(values).then((result) => {
                    console.log(result);
                    if (result !== undefined) {
                      console.log(result.data);
                      history.push("/identification");
                    } else {
                      setAlertOpen(true);
                      setAlertString("Username atau Password salah.");
                    }
                  });
                }, 500);
              }}
            >
              {({ submitForm, values }) => (
                <Form>
                  <Grid>
                    <Grid item xs={12}>
                      <InputField
                        className={classes.input}
                        fullWidth
                        name="username"
                        type="username"
                        label="Username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputPasswordField
                        className={classes.input}
                        fullWidth
                        name="password"
                        label="Password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        className={classes.button}
                        fullWidth
                        disabled={
                          values.password.length < 6 ||
                          values.username.length < 6 ||
                          values.orgName < 6
                        }
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                      >
                        LOGIN
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <AlertPopup
            string={alertString}
            open={alertOpen}
            onClose={handleCloseAlert}
          />
        </Grid>
      </Container>
    </>
  );
}

export default LoginPage;
