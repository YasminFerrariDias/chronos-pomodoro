import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate";

export type HomeProps = {
  state: TaskStateModel,
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

export function Settings() {
  
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, <br/> descanço curto e descanço longo.
        </p>
      </Container>

      <Container>
        <form action="" className="form">
          <div className="formRow">
            <DefaultInput id='workTime' labelText="Foco" type={"number"}/>
          </div>

          <div className="formRow">
            <DefaultInput id='shortBreakTime' labelText="Descanso Curto" type={"number"}/>
          </div>

          <div className="formRow">
            <DefaultInput id='longBreakTime' labelText="Descanso Longo" type={"number"}/>
          </div>

          <div className="formRow">
            <DefaultButton icon={<SaveIcon />} aria-label="Salvar Configurações" title="Salvar Configurações"/>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
 