import { gapi } from "gapi-script";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";

const clientId =
  "982099827840-dgf14s3u4u9dkon3idokciabcfqbkoma.apps.googleusercontent.com";

const GoogleLogInButton = () => {
  const navigate = useNavigate();
  const { context, setContext } = useStateContext();

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res: any) => {
    const googleAccountDetails = {
      name: res.profileObj.name,
      email: res.profileObj.email,
    };
    createAPIEndpoint(ENDPOINTS.participant)
      .post(googleAccountDetails)
      .then((res) => {
        setContext({
          ...context,
          participantId: res.data.id,
          name: googleAccountDetails.name,
        });
        navigate("/quiz");
      })
      .catch((err) => console.log(err));
  };

  const onFailure = (res: any) => {
    console.log("Login failed:", res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLogInButton;
