import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ContextProviderProp {
  children?: React.ReactNode;
}

interface ContextItem {
  participantId?: number | undefined;
  timeTaken?: number | undefined;
  selectedOptions?: number[] | undefined;
}

interface ContextValue {
  context: ContextItem;
  setContext: Dispatch<SetStateAction<ContextItem>>;
}

const defaultValue: ContextValue = {
  context: { 
    participantId: 0, 
    timeTaken: 0, 
    selectedOptions: new Array<number>()
  },
  setContext: context => {}
};

function getDefaltContext() {
  // localStorage.removeItem("context")
  if(localStorage.getItem("context") === null){
    localStorage.setItem("context", JSON.stringify({ ...defaultValue.context }))
  }
  return JSON.parse(localStorage.getItem("context")!)
}


export const stateContext = createContext(defaultValue);

export default function useStateContext() {

  const { context, setContext } = useContext(stateContext)

  return { 
    context,
    setContext: (item:ContextItem) => { setContext({...context, ...item})}
  }
}

export function ContextProvider({ children }: ContextProviderProp) {
  
  const [context, setContext] = useState(getDefaltContext());
  // console.log(localStorage.getItem("context"))

  useEffect(()=>{
    localStorage.setItem("context", JSON.stringify({...context}))
  }, [context])
  
  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  );
}