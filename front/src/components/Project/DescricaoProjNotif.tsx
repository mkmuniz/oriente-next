import { Botao } from "../Botao/Botao";
import { BotaoVerde } from "../Botao/BotaoVerde";
import { DescricaoProjeto } from "./DescricaoProjeto";
import styled from "@emotion/styled";

const Botoes = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;

  .Descri {
    display: flex;
    justify-content: center;
  }

  .botao {
    justify-content: center;
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  .botaoinf {
    display: none;
  }

  @media (max-width: 650px) {
    .botaoinf {
      display: flex;
      margin-top: 15px;
      justify-content: center;
      gap: 10px;
    }
  }
`;

export const DescricaoProjNotif = () => {
  return (
    <Botoes>
      <div className="botao">
        <BotaoVerde text="Aceitar" />
        <Botao text="Recusar" />
      </div>
      <div className="Descri">
        <DescricaoProjeto />
      </div>
      <div className="botaoinf">
        <BotaoVerde text="Aceitar" />
        <Botao text="Recusar" />
      </div>
    </Botoes>
  );
};
