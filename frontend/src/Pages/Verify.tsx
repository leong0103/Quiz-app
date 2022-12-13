import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserAPIEndpoint, USERENDPOINTS } from "../api";
import Center from "../Components/Center";
// import useCreateUserForm from "../hooks/useCreateUserForm";

interface Error {
  [key: string]: string;
}

export interface VerifyField {
  verificationToken: string;
}

const getFreshModel = (): VerifyField => ({
  verificationToken: "",
});

export default function VerifyUser() {
  const [values, setValues] = useState(getFreshModel());
  const [errors, setErrors] = useState<Error>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = (): Boolean => {
    let error: Error = {};
    error.verificationToken = values.verificationToken
      ? ""
      : "Please enter verify code";
    setErrors(error);
    return Object.values(error).every((item) => item === "");
  };

  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createUserAPIEndpoint(USERENDPOINTS.verify)
        .postByParams("token", values.verificationToken)
        .then((res) => {
          // console.log(res);
          navigate("/");
        })
        .catch((err) => {
          let error: Error = {};
          error.verificationToken = err.response.data;
          setErrors(error);
        });
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
                  label="Verify Code"
                  name="verificationToken"
                  value={values.verificationToken}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.verificationToken && {
                    error: true,
                    helperText: errors.verificationToken,
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
