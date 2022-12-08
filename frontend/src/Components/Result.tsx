import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAns[]>([]);

  interface AnsResponse {
    questionId: number;
    imageURL: string;
    options: string[];
    questionDetails: string;
    answer: number;
  }

  interface QuestionAns {
    questionId: number;
    imageURL: string;
    options: string[];
    questionDetails: string;
    answer: number;
    selectedIndex: number;
  }

  useEffect(() => {
    const ids = context.selectedOptions.map((item) => item.questionId);
    // console.log(ids)
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const ans: AnsResponse[] = res.data;
        // console.log(ans);
        //map and find is async method
        const promises = context.selectedOptions.map(async (x) => ({
          ...x,
          ...ans.find((y) => y.questionId === x.questionId)!,
        }));

        Promise.all(promises)
          .then((res) => {
            console.log(res);
            setQuestionAnswers(res);
            // calculateScore(res);
            setScore(calculateScore(res));
          })
          .catch((err) => console.log(err));

        // console.log(questionAnswers);

        // console.log(res.data)
      });
  }, []);

  const calculateScore = (questionAnswers: QuestionAns[]) => {
    let tempScore: number = questionAnswers.reduce((acc, curr) => {
      return curr.answer === curr.selectedIndex ? acc + 1 : acc;
    }, 0);
    return tempScore;
  };

  return (
    <Card
      sx={{ mt: 5, display: "flex", width: "100%", maxWidth: 640, mx: "auto" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
          <Typography variant="h4">Congratulations!</Typography>
          <Typography variant="h6">YOUR SCORE</Typography>
          <Typography variant="h5">
            {score} / 5
          </Typography>
        </CardContent>
        <CardMedia component="img" sx={{ width: 220 }} image="" />
      </Box>
    </Card>
  );
}
