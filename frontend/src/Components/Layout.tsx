import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useGoogleLogoutHooks from "../hooks/useGoogleLogoutHooks";
import LogoutHooks from "../hooks/useGoogleLogoutHooks";
import useStateContext from "../hooks/useStateContext";

export default function Layout() {
  const { resetContext } = useStateContext();
  const navigate = useNavigate();
  const { signOut } = useGoogleLogoutHooks();

  const logout = () => {
    resetContext();
    signOut();
    navigate("/");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: 640, m: "auto" }}>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
            Quiz App
          </Typography>
          <Button onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
