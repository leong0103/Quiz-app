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

interface AnsPageProp {
  questionAnswers: QuestionAnswers[];
}
export default function Answer({ questionAnswers }: AnsPageProp) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpanded(index);
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
          <AccordionSummary>
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {item.questionDetails}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {item.options.map((questionDetails, index) => (
                <ListItem key={index}>
                  <Typography>
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
