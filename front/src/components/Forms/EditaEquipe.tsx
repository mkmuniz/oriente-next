import styled from "@emotion/styled";
import { Botao } from "../Botao/Botao";
import { BotaoVerde } from "../Botao/BotaoVerde";
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import Loader2 from "../Loader/Loader2";

const StyledInput = styled.input`
  /* Remove as setas do campo de número */
  -moz-appearance: textfield;

  /* Para navegadores Webkit como Chrome e Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Para o Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const EditarEquipe = ({
  cancelar,
  idProjeto,
  alunos,
  atualiza,
  loading,
  msg,
}) => {
  const [editEquipe, setEditEquipe] = useState(alunos);
  const [alunosRemovidos, setRemovidos] = useState([]);
  const [novoAluno, setNovoAluno] = useState("");
  const [novosAlunos, setNovos] = useState([]);
  const [isLoading, setIsLoading] = useState("Adicionar");

  async function buscaAluno(ev) {
    ev.preventDefault();
    setIsLoading("Buscando");
    try {
      if (!novoAluno) {
        return;
      }
      const response = await axios.post("/aluno/tia/professor", {
        tia: novoAluno,
        amostra: editEquipe[0]?.nome,
      });
      if (response.status === 200) {
        console.log(response.data);
        const filtered = alunos.find(
          (elem) => elem.nome === response?.data?.nome
        );
        if (filtered) {
          return;
        }
        setNovos([...novosAlunos, response?.data?.nome]);
        setEditEquipe([
          ...editEquipe,
          {
            nome: response?.data?.nome,
            tia: "aguardando",
            turma: "aguardando",
          },
        ]);
      }
    } catch (err) {
      throw new Error("Falha ao excluir aluno!");
    } finally {
      setIsLoading("Adicionar");
      setNovoAluno("");
    }
  }

  function removerAluno(nome) {
    if (editEquipe.length <= 1) {
      return;
    }
    setRemovidos([...alunosRemovidos, nome]);
    const nomesAtualizados = editEquipe.filter((elem) => elem.nome !== nome);
    setEditEquipe(nomesAtualizados);
    console.log(alunosRemovidos);
  }

  async function handleUpdate() {
    loading(true);
    try {
      const response = await axios.put("/aluno/update/atualiza_equipe", {
        idProjeto: idProjeto,
        alunos_rm: alunosRemovidos,
        alunos_add: novosAlunos,
        remetente: sessionStorage.getItem("nome"),
      });
      if (response.status === 200) {
        atualiza(editEquipe);
        msg("Equipe atualizada!", "sucesso");
      }
    } catch (err) {
      msg("Falha ao atualizar equipe!", "falha");
      console.log(err);
    } finally {
      loading(false);
      cancelar();
    }
  }

  return (
    <>
      <span>Editar Equipe</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: "20px",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <StyledInput
          type="number"
          placeholder="TIA"
          value={novoAluno}
          onChange={(ev) => setNovoAluno(ev.target.value)}
        />
        <Botao text={isLoading} onClick={(ev) => buscaAluno(ev)} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {editEquipe &&
          editEquipe.map((elem, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>{`${index + 1}-${elem.nome}`}</div>
                {sessionStorage.getItem("permissao") === "coordenador" ? (
                  <img
                    src="../../images/trash-bin.png"
                    alt="trash-bin"
                    style={{
                      aspectRatio: "1/1",
                      width: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => removerAluno(elem.nome)}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
      <div className="botao-equipe">
        <Botao text="Cancelar" onClick={() => cancelar()} />
        <BotaoVerde
          text="Salvar"
          onClick={() => {
            handleUpdate();
          }}
        />
      </div>
    </>
  );
};
