import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { createUserAPIEndpoint, USERENDPOINTS } from "../api";
import Center from "../Components/Center";
import useCreateUserForm from "../hooks/useCreateUserForm";
import Success from "./Success";

interface Error {
  [key: string]: string;
}

export interface CreateUserField {
  email: string;
  password: string;
  confirmPassword: string;
}

const getFreshModel = (): CreateUserField => ({
  email: "",
  password: "",
  confirmPassword: "",
});

export default function CreateUser() {
  const { values, errors, setErrors, handleInputChange } = useCreateUserForm({
    getFreshModel,
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validate = (): Boolean => {
    let error: Error = {};
    // temp email not valid for this Regexp
    // let emailRegex = new RegExp(
    //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    //   "i"
    // );
    // error.email = emailRegex.test(values.email!) ? "" : "Email is not valid.";
    error.password = values.password !== "" ? "" : "This field is required.";
    error.password =
      values.password.length < 6 ? "Please enter at least 6 characters." : "";
    if (values.confirmPassword !== values.password) {
      error.password = "Please enter same password";
      error.confirmPassword = "Please enter same password";
    }
    setErrors(error);
    return Object.values(error).every((item) => item === "");
  };

  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createUserAPIEndpoint(USERENDPOINTS.register)
        .post(values)
        .then((res) => {
          setIsSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {isSuccess ? (
        <>
          <Success
            messageToDisplay={
              "User created, Please go to check your email and verify your account"
            }
          />
        </>
      ) : (
        <>
          <Center>
            <Card sx={{ width: 400 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={{ my: 3 }}>
                  Create User
                </Typography>
                <Box
                  sx={{
                    ".MuiTextField-root": {
                      m: 1,
                      width: "90%",
                    },
                  }}
                >
                  <form autoComplete="on" onSubmit={createUser}>
                    <TextField
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      {...(errors.email && {
                        error: true,
                        helperText: errors.email,
                      })}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      value={values.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      {...(errors.password && {
                        error: true,
                        helperText: errors.password,
                      })}
                    />
                    <TextField
                      label="Confirmed Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleInputChange}
                      variant="outlined"
                      {...(errors.confirmPassword && {
                        error: true,
                        helperText: errors.confirmPassword,
                      })}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ mt:"2%" ,width: "90%" }}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Center>
        </>
      )}
    </>
  );
}
