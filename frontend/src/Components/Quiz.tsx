import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext, { SelectedOption } from "../hooks/useStateContext";

interface QuestionResponse {
  questionId: number;
  imageURL: string;
  options: string[];
  questionDetails: string;
}

export default function Quiz() {
  const navigate = useNavigate();
  const { context, setContext, resetContext } = useStateContext();
  const [question, setQuestion] = useState<QuestionResponse[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  let timer = setInterval(() => {});
  const startTimer = () => {
    timer = setInterval(() => {
      //cant use setTimeTake(timeTaken + 1)
      //Because setTimeTake is a Async function
      setTimeTaken((prev) => prev + 1);
    }, 1500);
  };

  useEffect(() => {
    resetContext();
  }, []);

  useEffect(() => {
    setContext({
      ...context,
      timeTaken: 0,
      selectedOptions: new Array<SelectedOption>(),
    });
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestion(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => clearInterval(timer);
  }, []);

  const updateAnswer = (questionId: number, optionIndex: number) => {
    if (context.selectedOptions) {
      let temp = [...context.selectedOptions];
      temp.push({
        questionId,
        selectedIndex: optionIndex,
      });
      if (questionIndex < 4) {
        setContext({ ...context, selectedOptions: [...temp] });
        setQuestionIndex(questionIndex + 1);
        console.log("update question Index");
      } else {
        setContext({
          ...context,
          selectedOptions: [...temp],
          timeTaken: timeTaken,
        });
        navigate("/result");
      }
    }
  };

  return (
    <>
      {question.length !== 0 ? (
        <Card sx={{ maxWidth: 640, mx: "auto", mt: 10 }}>
          <CardHeader
            title={"Question " + (questionIndex + 1) + " of 5"}
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
          />
          <Box>
            <LinearProgress
              variant="determinate"
              value={((questionIndex + 1) * 100) / 5}
            />
          </Box>
          <CardContent>
            <Typography variant="h6">
              {question[questionIndex].questionDetails}
            </Typography>
            <List>
              {question[questionIndex].options.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() =>
                    updateAnswer(question[questionIndex].questionId, index)
                  }
                >
                  <div>
                    <b>{String.fromCharCode(65 + index) + " . "}</b>
                    {item}
                  </div>
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
