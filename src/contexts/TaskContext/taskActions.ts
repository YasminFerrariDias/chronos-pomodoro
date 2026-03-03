import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETED_TASK: 'COMPLETED_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

export type TaskActionsWithPayoload = 
  | {
    type: typeof TaskActionTypes.START_TASK;
    payload: TaskModel;
  } | {
    type: typeof TaskActionTypes.COUNT_DOWN;
    payload: {secondsRemaining: number};
  } | {
    type: typeof TaskActionTypes.CHANGE_SETTINGS;
    payload: TaskStateModel['config'];
  }; 

export type TaskActionsWithoutPayoload = | {
  type: typeof TaskActionTypes.RESET_STATE;
} | {
  type: typeof TaskActionTypes.INTERRUPT_TASK;
} | {
  type: typeof TaskActionTypes.COMPLETED_TASK;
};

export type TaskActionModel = 
  | TaskActionsWithPayoload
  | TaskActionsWithoutPayoload;

export type TaskActionTypes = keyof typeof TaskActionTypes; 