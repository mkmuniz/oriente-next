"use client"

import styled from "styled-components";
import { ProjContext } from "../../context/useContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const NotaAvaliador = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  text-align: justify;
  color: #000000;
  padding: 0px 10px 0px 10px;

  span {
    color: rgb(24, 34, 167);
    cursor: pointer;
    :hover {
      text-decoration: underline;
      transition: 0.5s;
    }
  }
`;

export const NotificacaoAvaliador = ({
  nome,
  projeto,
  idProjeto,
  idNotif,
  tipo,
  path,
}: any) => {
  const { setProj }: any = useContext(ProjContext);
  const navigate = useRouter();

  function clickHandler() {
    setProj(idProjeto, path, tipo, idNotif);
    navigate("/verProjeto");
  }

  return (
    <NotaAvaliador>
      <h3>
        {` O(A) professor(a) ${nome} te indicou como avaliador(a) para o projeto: ${projeto}. `}
        <span onClick={clickHandler}>Clique aqui para ver o projeto. </span>
      </h3>
    </NotaAvaliador>
  );
};
