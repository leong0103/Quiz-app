import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { QuestionAnswers } from "./Result";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { green, red, grey } from "@mui/material/colors";

interface AnswerComponentInput {
  questionAnswers: QuestionAnswers[];
}

export default function Answer({ questionAnswers }: AnswerComponentInput) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpanded(index);
  };

  const markCorrectOrNot = (
    questionAnswers: QuestionAnswers,
    index: number
  ) => {
    if (
      [questionAnswers.answer, questionAnswers.selectedIndex].includes(index)
    ) {
      const textColor = {
        color: questionAnswers.answer === index ? green[500] : red[500],
      };
      return textColor;
    }
  };

  return (
    <Box sx={{ mt: 5, width: "100%", maxWidth: 640, mx: "auto" }}>
      {questionAnswers.map((item, index) => (
        <Accordion
          disableGutters
          key={index}
          expanded={expanded === index}
          onChange={() => handleExpand(index)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{
                  color:
                    item.answer === item.selectedIndex ? green[500] : red[500],
                }}
              />
            }
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {item.questionDetails}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: grey[900] }}>
            <List>
              {item.options.map((questionDetails, index) => (
                <ListItem key={index}>
                  <Typography sx={markCorrectOrNot(item, index)}>
                    <b>{String.fromCharCode(65 + index) + " . "}</b>
                    {questionDetails}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
