import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Center from "../Components/Center";

interface SuccessProp {
  messageToDisplay: string;
}

export default function Success({messageToDisplay}: SuccessProp) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }
  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ my: 3 }}>
            {messageToDisplay}
          </Typography>
        <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ width: "30%" }}
                onClick={handleClick}
              >
                Home page
              </Button>
        </CardContent>
      </Card>
    </Center>
  );
}
