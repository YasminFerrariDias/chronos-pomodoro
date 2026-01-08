import type { TaskModel } from "./TaskModel";

// Estado -> Componente -> Filhos

export type TaskStateModel = {
  tasks: TaskModel[]; // historico, MainForm
  secondsRemaining: number; // home, CountDown, historico, MainForm, Button
  formattedSecondsRemaining: string; // titulo, CountDown
  activeTask: TaskModel | null; // CountDown, historico, MainForm, Button
  currentCycle: number; // 1 a 8 - home
  config: {
    workTime: number; // MainForm
    shortBreakTime: number; // MainForm
    longBreakTime: number; // MainForm
  };
};
