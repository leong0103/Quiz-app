import React from "react";
import GoogleLogin, { useGoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "982099827840-dgf14s3u4u9dkon3idokciabcfqbkoma.apps.googleusercontent.com";

const GoogleLogInButton = () => {
  const navigate = useNavigate();

  const onSuccess = (res: any) => {
    console.log("Login success: currentUse", res.profileObj);
    navigate("/quiz");
    // refreshTokenSetup(res);
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
