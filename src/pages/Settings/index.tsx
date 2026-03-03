import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dissmiss();

    const formErrors: string[] = [];

    // quando usamos o ref precisamos acessar a propriedade current para obter o elemento DOM e depois acessar o valor do input
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime)) {
      formErrors.push("O tempo de foco deve ser um número válido.");
      return;
    }

    if (isNaN(shortBreakTime)) {
      formErrors.push("O tempo de descanso curto deve ser um número válido.");
      return;
    }

    if (isNaN(longBreakTime)) {
      formErrors.push("O tempo de descanso longo deve ser um número válido.");
      return;
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push("O tempo de foco deve ser entre 1 e 99 minutos.");
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        "O tempo de descanso curto deve ser entre 1 e 30 minutos.",
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push(
        "O tempo de descanso longo deve ser entre 1 e 60 minutos.",
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas com sucesso!");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações para tempo de foco,
          <br />
          descanço curto e descanço longo.
          <br />
          OBSERVAÇÃO: Digite apenas números.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action="" className="form">
          <div className="formRow">
            <DefaultInput
              id="workTime"
              labelText="Foco"
              type={"number"}
              ref={workTimeInput}
              defaultValue={state.config.workTime}
            />
          </div>

          <div className="formRow">
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso Curto"
              type={"number"}
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>

          <div className="formRow">
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso Longo"
              type={"number"}
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              aria-label="Salvar Configurações"
              title="Salvar Configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
