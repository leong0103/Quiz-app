import React, { useContext } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'

export default function Question() { 
  // const { context, setContext } = useContext(stateContext)

  // setContext({
  //   ...context,
  //   timeTaken:1,
  // })
    const { context, setContext } = useStateContext();
    // setContext({ timeTaken:1 });
  return (
    <div>Question</div>
  )
}
