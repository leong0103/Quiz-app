import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextProviderProp {
  children?: React.ReactNode;
}
interface ContextState {
  participantId?: number | undefined;
  timeTaken?: number | undefined;
  selectedOptions?: number[] | undefined;
}

interface ContextValue {
  context: ContextState;
  setContext: Dispatch<SetStateAction<ContextState>>;
}

const defaultValue: ContextValue = {
  context: { 
    participantId: undefined, 
    timeTaken: undefined, 
    selectedOptions: undefined
  },
  setContext: context => {}
};

export const stateContext = createContext(defaultValue);

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext)
  return { context,
    setContext: (item:ContextState) => { setContext({...context, ...item})}
  }
}

export function ContextProvider({ children }: ContextProviderProp) {
  
  const [context, setContext] = useState(defaultValue.context);

  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  );
}
