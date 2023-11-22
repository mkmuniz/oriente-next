"use client"

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import Loader from "../Loader/Loader";
import { Alerta } from "@/components/Alerts/Alert";
import axios from "../../utils/axiosConfig";

const Container = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
    max-width: 80%;
    width: 50%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
  }

  button {
    width: 30%;
  }

  .botoes {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
  @media (max-width: 650px) {
    button {
      width: 50%;
      padding-left: 10px;
    }

    .botoes {
      width: 100%;
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 8px;
    }
    .modal-content {
      background-color: white;
      padding: 15px;
      border-radius: 20px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
      max-width: 85%;
      width: 65%;
      margin-left: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: auto;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const DivQuestionario = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  .header {
    width: 100%;

    display: flex;

    .divLogout {
      margin-top: 10px;
      cursor: pointer;
      width: 10%;
      display: flex;

      img {
        height: 24px;
      }
      span {
        font-weight: 300;
      }
    }
    .boxTexto {
      display: flex;
      justify-content: center;
      width: 80%;
      border-bottom: 3px solid red;

      .texto {
        font-weight: 600;
        font-size: 50px;
      }
    }
  }
  .divLogo {
    width: 10%;
  }
  #mack {
    height: 70px;
    padding: 15px;
  }

  #nomeProj {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }

  span {
    font-size: 22px;
    font-weight: 500;
  }

  .espaçoQuestoes {
    display: flex;
    justify-content: center;
    width: 90%;
    height: auto;
    margin-top: 10px;
    background-color: white;
    margin-bottom: 10px;
    align-items: center;
    gap: 20px;
    padding-bottom: 25px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
    flex-direction: column;
    border-radius: 10px;
  }
  .formQuestoes {
    width: 90%;
    height: auto;
    padding: 10px 5px 0 20px;
  }

  .questoes {
    width: 97%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    margin-top: 10px;
  }

  .enunciado {
    text-align: justify;
    padding-top: 10px;

    span {
      font-size: 20px;
      font-weight: 300;
    }
  }

  .areaRadios {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
  }

  .radioLabel {
    display: inline-block;
    text-align: center;
  }

  .titulo {
    display: flex;
    justify-content: center;
  }

  .inputArea input {
    width: 100%;
    border: none;
    border-bottom: 2px solid black;
    padding: 10px 0;
  }

  .botoes {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: 650px) {
    #mack {
      display: none;
    }
    .header {
    }
    .divLogout {
      position: absolute;
      right: 20px;
      top: 5px;
      align-items: center;
      margin-top: 0;

      span {
        font-size: 15px;
      }
    }
    .espaçoQuestoes {
      width: 95%;
    }
    .formQuestoes {
      padding: 10px 5px 0 0;
    }

    .enunciado span {
      font-size: 15px;
    }
  }
`;

const projSchema = z.object({
  q1: z.string().nonempty("O campo é obrigatório!"),
  q2: z.string().nonempty("O campo é obrigatório!"),
  q3: z.string().nonempty("O campo é obrigatório!"),
  q4: z.string().nonempty("O campo é obrigatório!"),
  q5: z.string().nonempty("O campo é obrigatório!"),
  q6: z.string().nonempty("O campo é obrigatório!"),
  q7: z.string().nonempty("O campo é obrigatório!"),
  q8: z.string().nonempty("O campo é obrigatório!"),
  q9: z.string().nonempty("O campo é obrigatório!"),
  q10: z.string().nonempty("O campo é obrigatório!"),
  coment: z.string().nonempty("O campo é obrigatório!"),
});

export const Questionario = ({ idProjeto, titulo, display }: any) => {
  const [isModalOpen, setIsOpen] = useState(false);
  const [tipo, setTipo] = useState("sair");
  const [data, setData] = useState();
  const [status, setStatus] = useState("formulario");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(projSchema) });

  const postaAvaliacao = (data: any) => {
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setIsOpen(true);
      setTipo("salvar");
      setData(data);
    }
  };
  async function salvaNotas() {
    setStatus("loader");
    try {
      const response = await axios.put(`/nota/add/${idProjeto}`, data);
      if (response.status === 200) {
        setStatus("ok");
      }
    } catch (err) {
      console.log(err);
      setStatus("formulario");
    }
  }
  function handleOpenModal(tipo: any, ev: any) {
    ev.preventDefault();
    setIsOpen(true);
    setTipo(tipo);
  }
  useEffect(() => {
    async function getNotas() {
      try {
      } catch (err) {
        console.log(err);
      }
    }
  });
  if (status === "formulario") {
    return (
      <Container>
        <DivQuestionario>
          <span id="nomeProj">{titulo}</span>
          <div className="espaçoQuestoes">
            <Form
              onSubmit={handleSubmit(postaAvaliacao)}
              className="formQuestoes"
            >
              <span> QUESTIONÁRIO </span>
              <p>
                Responda as perguntas a seguir sobre o projeto e a apresentação
                do grupo. Depois clique em "ENVIAR RESPOSTAS" para submeter as
                respostas
              </p>
              <div className="questoes">
                <div className="titulo">
                  <span>Apresentação</span>
                </div>
                <div className="enunciado">
                  <span>
                    1 - Estudante/Grupo apresenta uma visão geral da pesquisa em
                    90-180 segundos (em estilo de conversação),
                    contextualizando-a em conformidade com as expectativas de
                    especialistas, bem como de maneira acessível a outras
                    pessoas. Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q1")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q1")}
                    />
                  </label>
                </div>
                {errors.q1 && <ErroSpan message={"O campo é obrigatório!"} />}
                <div className="enunciado">
                  <span>
                    2 - Estudante/Grupo demonstra segurança e entusiasmo,
                    respondendo as questões dos professores (bem como do público
                    em geral) confortavelmente. Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q2")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q2")}
                    />
                  </label>
                </div>
                {errors.q2 && <ErroSpan message={"O campo é obrigatório!"} />}
                <div className="enunciado">
                  <span>
                    3 - Estudante/Grupo fala de maneira clara, não faz uso de
                    vícios de lingaguem e mantém contato visual com os
                    professores ou público (e olha para o Pôster quando é
                    necessário mostrar algum elemento). Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q3")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q3")}
                    />
                  </label>
                </div>
                {errors.q3 && <ErroSpan message={"O campo é obrigatório!"} />}
              </div>
              <div className="questoes">
                <div className="titulo">
                  <span>Conteúdo de pesquisa</span>
                </div>
                <div className="enunciado">
                  <span>
                    1 - Estudante/Grupo possui domínio do tópico de pesquisa e
                    da relação deste com o contexto disciplinar do Curso de
                    Graduação, bem como com os avanços científicos, comerciais e
                    sociais (se cabível) relacionados. Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q4")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q4")}
                    />
                  </label>
                </div>
                {errors.q4 && <ErroSpan message={"O campo é obrigatório!"} />}
                <div className="enunciado">
                  <span>
                    2 - Estudante/Grupo deixa claro os antecedentes (por que a
                    pesquisa foi realizada), dispondo a pertinência e relevância
                    da hipótese ou da questão da investigação no contexto atual
                    (bem como a originalidade e/ou inovação do trabalho –
                    elemento não obrigatório). Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q5")}
                    />
                  </label>
                </div>
                {errors.q5 && <ErroSpan message={"O campo é obrigatório!"} />}
                <div className="enunciado">
                  <span>
                    3 - Estudante/Grupo coloca o embasamento utilizado
                    (conceitos fundamentais e trabalhos relacionados
                    relevantes). Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q6")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q6")}
                    />
                  </label>
                </div>
                {errors.q6 && <ErroSpan message={"O campo é obrigatório!"} />}

                <div className="enunciado">
                  <span>
                    4 - Estudante/Grupo descreve os materiais e métodos
                    (procedimentos, equipamentos, modelos, programas,
                    arquiteturas, etc.) utilizados na investigação. Dê uma nota
                    de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q7")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q7")}
                    />
                  </label>
                </div>
                {errors.q7 && <ErroSpan message={"O campo é obrigatório!"} />}
                <div className="enunciado">
                  <span>
                    5 - Estudante/Grupo dispõe conclusões baseadas na análise
                    dos resultados obtidos (o que foi descoberto, feito,
                    coletado ou produzido) por meio da metodologia descrita,
                    dispondo argumentos apoiados na revisão de literatura
                    empreendida.
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q8")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q8")}
                    />
                  </label>
                </div>
                {errors.q8 && <ErroSpan message={"O campo é obrigatório!"} />}
              </div>
              <div className="questoes">
                <div className="titulo">
                  <span>Design e Formato</span>
                </div>
                <div className="enunciado">
                  <span>
                    1 - O Pôster apresenta organização visual (permitindo a
                    identificação de títulos e blocos de informações), tamanho
                    de letra que permite visualização numa distância de 2 a 3
                    metros e texto elaborado adequadamente (claro, conciso,
                    preciso; com pontuação, ortografia, sintaxe e concordância
                    verbo-nominal adequados) de maneira que chama a atenção da
                    audiência. Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q9")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q9")}
                    />
                  </label>
                </div>
                {errors.q9 && <ErroSpan message={"O campo é obrigatório!"} />}

                <div className="enunciado">
                  <span>
                    2 - O Pôster possui composição visual atrativa, que denota a
                    atenção com o design, cores, tipos de letra, figuras e
                    elementos de visualização empregados. Dê uma nota de 0 a 10:
                  </span>
                </div>
                <div className="areaRadios">
                  <label className="radioLabel">
                    <div>0</div>
                    <input
                      type="radio"
                      value={"0"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>1</div>
                    <input
                      type="radio"
                      value={"1"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>2</div>
                    <input
                      type="radio"
                      value={"2"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>3</div>
                    <input
                      type="radio"
                      value={"3"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>4</div>
                    <input
                      type="radio"
                      value={"4"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>5</div>
                    <input
                      type="radio"
                      value={"5"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>6</div>
                    <input
                      type="radio"
                      value={"6"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>7</div>
                    <input
                      type="radio"
                      value={"7"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>8</div>
                    <input
                      type="radio"
                      value={"8"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>9</div>
                    <input
                      type="radio"
                      value={"9"}
                      {...register("q10")}
                    />
                  </label>
                  <label className="radioLabel">
                    <div>10</div>
                    <input
                      type="radio"
                      value={"10"}
                      {...register("q10")}
                    />
                  </label>
                </div>
                {errors.q10 && <ErroSpan message={"O campo é obrigatório!"} />}
              </div>
              <div className="questoes">
                <div className="titulo">
                  <span>Comentários Gerais</span>
                </div>
                <div className="enunciado">
                  <span>
                    Inclusão de comentários e sugestões de melhoria para que
                    o(s) autor(es) do TCC possa(m) realizar os ajustes
                    necessários para a entrega do artigo.
                  </span>
                </div>
                <div className="inputArea">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Digite aqui"
                    {...register("coment")}
                  />
                </div>
                {errors.coment && <ErroSpan message={errors.coment.message} />}
              </div>
              <div className="botoes">
                <Botao
                  text="Cancelar"
                  type="button"
                  onClick={(ev: any) => handleOpenModal("sair", ev)}
                />
                <BotaoVerde text="Confirmar" type="button" />
              </div>
            </Form>
          </div>
        </DivQuestionario>
        {isModalOpen ? (
          <div className="modal">
            <div className="modal-content">
              {tipo === "sair" && (
                <div>
                  <h3>Tem certeza que deseja sair da avaliação?</h3>
                  <p>
                    Não será possível recuperar as notas se você escolher sair!
                  </p>
                  <div className="botoes">
                    <Botao text="Fechar" onClick={() => setIsOpen(false)} />
                    <BotaoVerde
                      text="Sair"
                      onClick={() => {
                        setIsOpen(false);
                        display(false);
                      }}
                    />
                  </div>
                </div>
              )}
              {tipo === "salvar" && (
                <div>
                  <h3>Tem certeza que deseja salvar as notas?</h3>
                  <p>Não será possível editar as notas posteriormente!</p>
                  <div className="botoes">
                    <Botao text="Fechar" onClick={() => setIsOpen(false)} />
                    <BotaoVerde text="Salvar" onClick={() => salvaNotas()} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </Container>
    );
  } else if (status === "loader") {
    return (
      <>
        <Loader />
      </>
    );
  } else if (status === "ok") {
    return (
      <>
        <Alerta texto={"Notas submetidas com sucesso!"} />
        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <Botao text="Voltar" onClick={() => display(false)} />
        </div>
      </>
    );
  }
};
