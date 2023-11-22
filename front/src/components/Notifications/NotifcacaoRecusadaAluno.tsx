import styled from "styled-components";

const NotOrientador = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: row;
  text-align: left;
  color: #000000;
  padding: 0px 10px 0px 10px;
`;

export const NotificacaoRecusadoAluno = ({ nome }) => {
  return (
    <NotOrientador>
      <h3> O aluno {nome} recusou participar do seu projeto.</h3>
      <h3>{` O(A) aluno(a) ${nome} recusou participar do seu projeto. `}</h3>
    </NotOrientador>
  );
};
