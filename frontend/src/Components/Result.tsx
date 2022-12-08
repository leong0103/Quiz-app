import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext, { SelectedOption } from "../hooks/useStateContext";
import { green } from "@mui/material/colors";
import Answer from "./Answer";

interface AnsResponse {
  questionId: number;
  imageURL: string;
  options: string[];
  questionDetails: string;
  answer: number;
}

export interface QuestionAnswers {
  questionId: number;
  imageURL: string;
  options: string[];
  questionDetails: string;
  answer: number;
  selectedIndex: number;
}

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState<number>(0);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswers[]>([]);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    const ids = context.selectedOptions.map((item) => item.questionId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const ans: AnsResponse[] = res.data;
        //map and find is async method, Promise all for resolve all promise
        const promises = context.selectedOptions.map((x) => ({
          ...x,
          ...ans.find((y) => y.questionId === x.questionId)!,
        }));

        Promise.all(promises)
          .then((res) => {
            console.log(res);
            setQuestionAnswers(res);
            setScore(calculateScore(res));
          })
          .catch((err) => console.log(err));
      });
  }, []);

  const calculateScore = (questionAnswers: QuestionAnswers[]) => {
    let tempScore: number = questionAnswers.reduce((acc, curr) => {
      return curr.answer === curr.selectedIndex ? acc + 1 : acc;
    }, 0);
    return tempScore;
  };

  const restart = () => {
    setContext({
      ...context,
      timeTaken: 0,
      selectedOptions: new Array<SelectedOption>(),
    });
    navigate("/quiz");
  };

  const sumitResult = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        id: context.participantId,
        timeTaken: context.timeTaken,
        score: score,
      })
      .then((res) => {
        setIsSubmitSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5">
              <Typography component="span" variant="h5" color={green[500]}>
                {score}
              </Typography>{" "}
              / {context.selectedOptions.length}
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1, mb: 2 }}
              size="small"
              onClick={sumitResult}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1, mb: 2 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="outlined"
              sx={{
                width: "60%",
                m: "auto",
                visibility: isSubmitSuccess ? "visible" : "hidden",
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
          <CardMedia component="img" sx={{ width: 220 }} image="" />
        </Box>
      </Card>
      <Answer questionAnswers={questionAnswers} />
    </>
  );
}
