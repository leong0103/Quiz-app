import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import Center from "../Components/Center";
import GoogleLogInButton from "../Components/GoogleLogInButton";
import useLoginForm from "../hooks/useLoginForm";

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
  const { values, errors, setErrors, handleInputChange } = useLoginForm({
    getFreshModel,
  });

  useEffect(() => {
    resetContext();
  }, [resetContext]);

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
          setContext({ ...context, participantId: res.data.id , name: values.name});
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
          <Divider
            component="li"
            sx={{
              borderBottomWidth: 4,
              marginLeft: "5%",
              marginRight: "5%",
              listStyle: "none",
              mt: "5%",
            }}
          />
          <Box sx={{ mt: "5%" }}>
            <GoogleLogInButton />
          </Box>
          <Divider
            component="li"
            sx={{
              borderBottomWidth: 4,
              marginLeft: "5%",
              marginRight: "5%",
              listStyle: "none",
              mt: "5%",
            }}
          />
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{ mt: "5%", width: "90%" }}
          >
            Admin login
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={() => navigate("/create-user")}
            sx={{ mt: "5%", width: "90%" }}
          >
            Create new admin account
          </Button>
        </CardContent>
      </Card>
    </Center>
  );
}
