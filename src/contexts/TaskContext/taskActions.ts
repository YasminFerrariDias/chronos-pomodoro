import type { TaskModel } from "../../models/TaskModel";

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

export type TaskActionsWithPayoload = 
| {
  type: typeof TaskActionTypes.START_TASK,
  payload: TaskModel;
} | {
  type: typeof TaskActionTypes.INTERRUPT_TASK,
  payload: TaskModel;
};

export type TaskActionsWithoutPayoload = | {
  type: typeof TaskActionTypes.RESET_STATE;
} 

export type TaskActionModel = 
  | TaskActionsWithPayoload
  | TaskActionsWithoutPayoload;

export type TaskActionTypes = keyof typeof TaskActionTypes; 