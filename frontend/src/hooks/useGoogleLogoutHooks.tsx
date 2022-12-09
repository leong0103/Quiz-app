import React from "react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  "982099827840-dgf14s3u4u9dkon3idokciabcfqbkoma.apps.googleusercontent.com";

export default function useGoogleLogoutHooks() {
  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    console.log("Logged out Success");
    navigate("/");
  };

  const onFailure = () => {
    console.log("Logout failed:");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return {
    signOut,
  };
}
