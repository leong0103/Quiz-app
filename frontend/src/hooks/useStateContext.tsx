import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ContextProviderProp {
  children?: React.ReactNode;
}

interface ContextItem {
  participantId: number;
  timeTaken: number;
  selectedOptions: SelectedOption[];
}

interface ContextValue {
  context: ContextItem;
  setContext: Dispatch<SetStateAction<ContextItem>>;
}

export interface SelectedOption {
  questionId: number;
  selectedIndex: number;
}

const defaultValue: ContextValue = {
  context: { 
    timeTaken: 0, 
    selectedOptions: new Array<SelectedOption>(),
    participantId: 0 ,
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
    setContext: (item:ContextItem) => { 
      // console.log(item);
      setContext({...context, ...item})
    },
    resetContext: () => {
      localStorage.removeItem('context')
      setContext(getDefaltContext())
    }
  }
}

export function ContextProvider({ children }: ContextProviderProp) {
  
  const [context, setContext] = useState(getDefaltContext());
  // console.log(localStorage.getItem("context"))

  useEffect(()=>{
    localStorage.setItem("context", JSON.stringify({...context}))
    // console.log(context)
  }, [context])
  
  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  );
}
