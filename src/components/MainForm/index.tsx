import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("deu certo");
  }

  return (
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
          <DefaultInput labelText="task:" id="meuInput" type="text" placeholder='Digite algo...'/>
      </div>

      <div className="formRow">
        <p>Próximo intervalo é de 25 min</p>
      </div>

      <div className="formRow">
        <Cycles />
      </div>

      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </div>
    </form>
  )
}