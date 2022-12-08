import React, { useEffect } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext'

export default function Result() {
  const {context, setContext} = useStateContext();

  useEffect(() => {
    const ids = context.selectedOptions?.map(item => item.questionId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
    .post(ids)
    .then(res => {
      console.log(res.data);
    })

  }, [])
  return (
    <div>Result</div>
  )
}
