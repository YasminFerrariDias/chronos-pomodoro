import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const workerRef = useRef<TimerWorkerManager | null>(null);

  // 1. Configurar worker e listener APENAS UMA VEZ
  useEffect(() => {
    // Criar worker apenas uma vez
    workerRef.current = TimerWorkerManager.getInstance();
    const worker = workerRef.current;

    // Definir listener
    const handleWorkerMessage = (e: MessageEvent) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({ type: TaskActionTypes.COMPLETED_TASK });
        // Enviar comando STOP, não terminar
        worker.postMessage({ type: "STOP" });
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    };

    worker.onmessage = handleWorkerMessage;

    // Cleanup
    return () => {
      worker.onmessage = null;
    };
  }, []); // [] = executa apenas na montagem

  // 2. Controlar worker baseado no estado
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) return;

    if (!state.activeTask) {
      // Parar timer, não terminar worker
      worker.postMessage({ type: "STOP" });
      return;
    }

    // Enviar dados específicos, não todo o estado
    if (state.activeTask && state.secondsRemaining > 0) {
      worker.postMessage({
        type: "START",
        data: {
          duration: state.secondsRemaining * 1000,
          taskId: state.activeTask.id,
        },
      });
    }
  }, [state.activeTask, state.secondsRemaining]); // Dependências específicas

  // 3. Gerenciar áudio
  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else if (!state.activeTask) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  // 4. Cleanup final (desmontagem)
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
