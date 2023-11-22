import styled from "styled-components";
import Link from "next/link";

const CardNotif = styled.div`
  padding: 0 10px 0 10px;
  border: 0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  width: 79%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: left;
  flex-direction: row;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  & > * {
    margin-bottom: 13px;
    margin-top: 13px;
  }
  img {
    height: 70px;
  }
`;

export const CardAlertaNotificacao = ({ nome, cargo, matricula, num }: any) => {
  return (
    <CardNotif>
      <div
        className="esquerda"
        style={{ display: "flex", justifyContent: "left" }}
      >
        <img src="./images/alert.png" alt="alert" />
      </div>
      <div
        className="direita"
        style={{ width: "100%", textAlign: "left", padding: "0 0 0 20px" }}>
        
        <h2>
          {num===1?`Você possui ${num} notificação!`: `Você possui ${num} notificações!`}

          <Link href="/notificacoes"> Clique aqui para ver. </Link>{" "}
        </h2>
      </div>
    </CardNotif>
  );
};
