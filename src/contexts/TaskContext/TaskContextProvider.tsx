import { useReducer, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  type ActionType = {
    type: string;
    payload?: number;
  }

  const [myState, dispatch] = useReducer((state, action) => {
    console.log(state, action);

    switch (action.type) {
      case 'INCREMENT':{
        if(!action.payload) return state;
        return {
          ...state,
          secondsReamining: state.secondsReamining + action.payload,
        }
      }
      case 'DECREMENT':{
        if(!action.payload) return state;
        return {
          ...state,
          secondsReamining: state.secondsReamining - action.payload,
        }
      }
      case 'ZERAR':{
        return {
          secondsReamining: 0
        }
      }
    }

    return state;
  }, {
    secondsReamining: 0,
  });
  
  return (
    <TaskContext.Provider value={{ state, setState }}>
      <h1>O número é {JSON.stringify(myState)}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10})}>incremente + 10</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 20})}>DECREMENT - 20</button>
      <button onClick={() => dispatch({ type: 'ZERAR', payload: 20})}>ZERAR</button>
    </TaskContext.Provider>
  );
}