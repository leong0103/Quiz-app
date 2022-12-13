import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { createUserAPIEndpoint, USERENDPOINTS } from "../api";
import Center from "../Components/Center";
import useCreateUserForm from "../hooks/useCreateUserForm";


interface Error {
  [key: string]: string;
}

export interface CreateUserField {
    email: string;
    password: string;
    confirmPassword: string
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

  const validate = (): Boolean => {
    let error: Error = {};
    let emailRegex = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "i"
    );
    error.email = emailRegex.test(values.email!) ? "" : "Email is not valid.";
    error.password = values.password !== "" ? "" : "This field is required.";
    error.password = values.password.length < 6 ? "Please enter at least 6 characters." : "";
    if(values.confirmPassword !== values.password)
    {
      error.password = "Please enter same password"
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
          console.log(res);
          
          // navigate("/quiz");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ my: 3 }}>
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
                  {...(errors.password && { error: true, helperText: errors.password })}
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
                  sx={{ width: "90%" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    </>
  );
}
