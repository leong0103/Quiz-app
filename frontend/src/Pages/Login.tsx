import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useForm from "../hooks/useForm";
import useStateContext from "../hooks/useStateContext";
import Center from "../Components/Center";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import LoginHooks from "../Components/GoogleLogInButton";
import GoogleLogInButton from "../Components/GoogleLogInButton";

interface Error {
  [key: string]: string;
}

const getFreshModel = () => ({
  name: "",
  email: "",
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();
  const { values, errors, setErrors, handleInputChange } = useForm({
    getFreshModel,
  });

  const clientId =
    "982099827840-dgf14s3u4u9dkon3idokciabcfqbkoma.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res: any) => {
    // console.log("success:", res);
    console.log(res.profileObj.name);
    console.log(res.profileObj.email);
    const googleAccountDetails = {
      name: res.profileObj.name,
      email: res.profileObj.email,
    };
    // if (sessionStorage.getItem("isLoggedIn") === "true") {
    //   console.log("sessionStorage")
    // }
    createAPIEndpoint(ENDPOINTS.participant)
      .post(googleAccountDetails)
      .then((res) => {
        setContext({ ...context, participantId: res.data.id });
        navigate("/quiz");
      })
      .catch((err) => console.log(err));
  };
  const onFailure = (err: any) => {
    console.log("failed:", err);
  };

  useEffect(() => {
    resetContext();
  }, []);

  const validate = (): Boolean => {
    let error: Error = {};
    let emailRegex = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "i"
    );
    error.email = emailRegex.test(values.email) ? "" : "Email is not valid.";
    error.name = values.name !== "" ? "" : "This field is required.";
    setErrors(error);
    return Object.values(error).every((item) => item === "");
  };

  const Login = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ ...context, participantId: res.data.id });
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              ".MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            {context.participantId}
            <form autoComplete="on" onSubmit={Login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
          </Box>
          <GoogleLogInButton />
        </CardContent>
      </Card>
    </Center>
  );
}
