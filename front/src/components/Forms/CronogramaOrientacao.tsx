import styled from "styled-components";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DivCronograma = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  .subtitulo {
    width: 100%;
    height: 50px;
    font-size: 18px;
  }

  .botoes {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px 0;
  }

  .formato {
    display: flex;
    width: 50%;
    gap: 20px;
  }
  .alinhaErro {
    text-align: left;
  }
  .opcao {
    display: flex;
  }

  .opcaoTexto {
    margin-right: 10px;
  }
  .alinharRadio {
    display: flex;
    align-items: center;
    padding-right: 5px;
  }

  .inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 15px;
  }

  .inputArea {
    width: 100%;
  }

  .inputArea input {
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    height: 20px;
  }

  .periodicidade {
    margin-top: 15px;
    display: flex;
    width: 50%;
    gap: 20px;
  }

  .diaSemana {
    width: 100%;
    display: flex;
    padding: 20px 0;
    flex-direction: column;
    text-align: left;
    span {
      width: 100%;
    }
    .semana {
      width: 100%;
      select {
        width: 100%;
        font-size: 20px;
        font-family: ${(props: any) => props.theme.fontFamily};
      }
    }
  }
  @media (max-width: 650px) {
    span {
      font-size: 15px;
    }
    label {
      font-size: 15px;
    }
    .formato {
      margin-top: 5px;
      flex-direction: column;

      span {
        font-weight: 500;
      }
    }
    .opcao {
      display: flex;
      font-size: 12px;
      flex-direction: column;
      width: auto;
      heigth: 70px;
      border: 1px pink solid;
    }
    .formato {
      border: 2px yellow solid;
      width: 100%;
      height: auto;
    }
    .alinharRadio {
      display: flex;
      align-items: center;
      padding-right: 5px;
      flex-direction: row;
      width: 50px;
      border: 1px pink solid;
    }
    .opcaoTexto {
      margin-right: 5px;
      width: 60px;
    }
    .hibrido {
      width: 60px;
    }

    .periodicidade {
      margin-top: 5px;
      font-size: 10px;
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 5px;
        font-weight: 500;
      }
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

const cronogramaSchema = z.object({
  formato: z.string("Selecione uma opção!"),
  periodicidade: z.string("Selecione uma opção!"),
  dia_da_semana: z.string().nonempty("O campo é obrigatório"),
  local: z.string().nonempty("O campo é obrigatório"),
  horario: z.string().nonempty("O campo é obrigatório!"),
});

export const CronogramaOrientacao = ({
  cancelar,
  idProjeto,
  cronograma,
  atualiza,
  loading,
  msg,
}: any) => {
  const [editCronograma, setEditCronograma] = useState(cronograma);

  function handleModal(ev: any) {
    ev.preventDefault();
    cancelar();
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cronogramaSchema),
  });

  async function updateCronograma(data: any) {
    loading(true);
    try {
      const response = await axios.put(
        `/projetos/cronograma/${idProjeto}`,
        data
      );
      if (response.status === 200) {
        msg("Dados atualizados com sucesso!", "sucesso");
        atualiza(data);
      }
    } catch (err: any) {
      if (err?.data?.msg) {
        msg(err.data.msg, "erro");
      } else {
        msg("Falha ao atulizar dados!", "erro");
      }
      console.log(err);
    } finally {
      loading(false);
    }
  }
  return (
    <>
      <DivCronograma>
        <Form onSubmit={handleSubmit(updateCronograma)}>
          <div className="subtitulo">
            <span> Cronograma de Orientação </span>
          </div>
          <div className="formato">
            <span>Formato:</span>
            <div className="opcao">
              <div className="alinharRadio">
                <input
                  id="presencial"
                  type="radio"
                  value="Presencial"
                  checked={editCronograma?.formato === "Presencial"}
                  onClick={(e: any) =>
                    setEditCronograma({
                      ...editCronograma,
                      formato: e.target.value,
                    })
                  }
                  {...register("formato")}
                />
              </div>
              <label className="opcaoTexto" htmlFor="presencial">
                Presencial
              </label>
              <div className="alinharRadio">
                <input
                  id="online"
                  type="radio"
                  value="Online"
                  {...register("formato")}
                  checked={editCronograma?.formato === "Online"}
                  onClick={(e: any) =>
                    setEditCronograma({
                      ...editCronograma,
                      formato: e.target.value,
                    })
                  }
                  {...register("formato")}
                />
              </div>
              <label className="opcaoTexto" htmlFor="online">
                Online
              </label>
              <div className="alinharRadio">
                <input
                  id="hibrido"
                  type="radio"
                  value="Híbrido"
                  {...register("formato")}
                  checked={editCronograma?.formato === "Híbrido"}
                  onClick={(e: any) =>
                    setEditCronograma({
                      ...editCronograma,
                      formato: e.target.value,
                    })
                  }
                />
              </div>
              <label htmlFor="hibrido" className="hibrido">
                Híbrido
              </label>
            </div>
          </div>
          <div className="alinhaErro">
            {errors.formato && <ErroSpan message={"Selecione uma opção!"} />}
          </div>
          <div className="inputs">
            <span>Local:</span>
            <div className="inputArea">
              <input
                type="text"
                className="custom-input"
                {...register("local")}
                defaultValue={editCronograma?.local}
                onChange={(e) =>
                  setEditCronograma({
                    ...editCronograma,
                    local: e.target.value,
                  })
                }
              />
            </div>
            {errors.local && <ErroSpan message={errors.local.message} />}
          </div>
          <div className="periodicidade">
            <span>Periodicidade:</span>
            <div className="opcao">
              <div className="alinharRadio">
                <input
                  id="semanal"
                  type="radio"
                  value="Semanal"
                  {...register("periodicidade")}
                  checked={editCronograma?.periodicidade === "Semanal"}
                  onClick={(e: any) =>
                    setEditCronograma({
                      ...editCronograma,
                      periodicidade: e.target.value,
                    })
                  }
                />
              </div>
              <label htmlFor="semanal" className="opcaoTexto">
                Semanal
              </label>
              <div className="alinharRadio">
                <input
                  id="quinzenal"
                  type="radio"
                  value="Quinzenal"
                  {...register("periodicidade")}
                  checked={editCronograma?.periodicidade === "Quinzenal"}
                  onClick={(e: any) =>
                    setEditCronograma({
                      ...editCronograma,
                      periodicidade: e.target.value,
                    })
                  }
                />
              </div>
              <label htmlFor="quinzenal">Quinzenal</label>
            </div>
          </div>
          <div className="alinhaErro">
            {errors.periodicidade && (
              <ErroSpan message={"Selecione uma opção!"} />
            )}
          </div>
          <div className="inputs">
            <span>Horário:</span>
            <div className="inputArea">
              <input
                type="text"
                className="custom-input"
                {...register("horario")}
                defaultValue={editCronograma?.horario}
                onChange={(e) =>
                  setEditCronograma({
                    ...editCronograma,
                    horario: e.target.value,
                  })
                }
              />
            </div>
            {errors.horario && <ErroSpan message={errors.horario.message} />}
          </div>
          <div className="diaSemana">
            <span> Dia da semana: </span>
            <div className="semana">
              <select
                {...register("dia_da_semana")}
                defaultValue={editCronograma?.dia_da_seamana}
                onChange={(e) =>
                  setEditCronograma({
                    ...editCronograma,
                    dia_da_semana: e.target.value,
                  })
                }
              >
                <option
                  value="Segunda-Feira"
                  selected={
                    editCronograma?.dia_da_semana === "Segunda-Feira"
                      ? true
                      : false
                  }
                >
                  {" "}
                  Segunda-Feira
                </option>
                <option
                  value="Terça-Feira"
                  selected={
                    editCronograma?.dia_da_semana === "Terça-Feira"
                      ? true
                      : false
                  }
                >
                  {" "}
                  Terça-Feira
                </option>
                <option
                  value="Quarta-Feira"
                  selected={
                    editCronograma?.dia_da_semana === "Quarta-Feira"
                      ? true
                      : false
                  }
                >
                  {" "}
                  Quarta-Feira
                </option>
                <option
                  value="Quinta-Feira"
                  selected={
                    editCronograma?.dia_da_semana === "Quinta-Feira"
                      ? true
                      : false
                  }
                >
                  {" "}
                  Quinta-Feira
                </option>
                <option
                  value="Sexta-Feira"
                  selected={
                    editCronograma?.dia_da_semana === "Sexta-Feira"
                      ? true
                      : false
                  }
                >
                  {" "}
                  Sexta-Feira
                </option>
              </select>
              {errors.dia_da_semana && (
                <ErroSpan message={errors.dia_da_semana.message} />
              )}
            </div>
          </div>
          <div className="botoes">
            <Botao text="Fechar" onClick={(ev: any) => handleModal(ev)} />
            <BotaoVerde text="Salvar" />
          </div>
        </Form>
      </DivCronograma>
    </>
  );
};
