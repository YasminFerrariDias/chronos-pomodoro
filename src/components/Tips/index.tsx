import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  // Tips
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <b>{state.config.workTime} minutos</b></span>,
    shortBreakTime: <span>Descanse por <b>{state.config.shortBreakTime} minutos</b></span>,
    longBreakTime: <span>Descanso <b>longo</b></span>,
  }

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de <b>{state.config.workTime} minutos</b></span>,
    shortBreakTime: (
      <span>Próximo ciclo é de <b>{state.config.shortBreakTime} minutos</b></span>
    ),
    longBreakTime: <span>Próximo descanso será <b>longo</b></span>,
  }

  return <>
    {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
    {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
  </>
}