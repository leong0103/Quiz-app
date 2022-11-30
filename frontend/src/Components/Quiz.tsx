import { Card, CardContent, CardHeader, List, ListItemButton, Typography } from '@mui/material';
import { time } from 'console';
import React, { useContext, useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext, { stateContext } from '../hooks/useStateContext'
import Center from './Center';

interface QuestionResponse {
  id: number;
  imageURL: string;
  options: string[];
  questionDetails: string
}


export default function Quiz() { 

    const { context, setContext } = useStateContext();
    const [ question, setQuestion ] = useState<QuestionResponse[]>([]);
    const [ questionIndex, setQuestionIndex ] = useState<number>(0);
    const [ timeTaken, setTimeTaken ] = useState<number>(0);
    
    let timer = setInterval(() => {});

    const startTimer = () => {
      timer = setInterval(() => {
        //cant use setTimeTake(timeTaken + 1)
        //Because setTimeTake is a Async function
        setTimeTaken(prev => prev + 10)
        // console.log(timeTaken);
      }, 1000);
    }
    
    useEffect(()=> {
      createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => {
        setQuestion(res.data);
        startTimer();
      })
      .catch(err => { console.log(err); })

      return () => clearInterval(timer);
    }, [])

    useEffect(() => {
      console.log(timeTaken);
    }, [timeTaken])

  return (
    <>
    {question.length !== 0 ? 
      <Card 
        sx={{ maxWidth: 640, mx: 'auto', mt: 5}} >
        <CardHeader 
          title={'Question ' + (questionIndex + 1) + ' of 5'}
          action={<Typography>{timeTaken}</Typography>}
          />
        <CardContent>
            <Typography variant='h6'>
              
              {question[questionIndex].questionDetails}
            </Typography>
            <List>
              {question[questionIndex].options.map((item, index) => 
                <ListItemButton 
                  key={index}
                  disableRipple
                  >
                    <div>
                      <b>{String.fromCharCode(65 + index) + ' . '}</b>{item}
                    </div>
                </ListItemButton>
              )}
            </List>
        </CardContent>
      </Card>
    :
      null}
    </>
  )
}
