import styled from "styled-components";
import { Botao } from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import axios from "@/utils/axiosConfig";
import Loader from "@/components/Loader/Loader";
import Loader2 from "@/components/Loader/Loader2";
import { Overlay } from "@/components/Overlay/Overlay";
import { AlertaFalha } from "@/components/Alerts/FailAlert";

const DivProjeto = styled.div`
  margin-top: 10px;
  background-color: white;
  align-items: center;
  display: flex;
  gap: 20px;
  padding-bottom: 25px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  flex-direction: column;
  width: 80%;
  border-radius: 10px;

  .tituloInput {
    display: flex;
    flex-direction: column;
    input {
      font-family: ${(props) => props.theme.fontFamily};
    }
  }

  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  label {
    text-align: left;
    font-weight: bold;
  }
  input {
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
  }
  textarea {
    background-color: #d9d9d9;
    border-radius: 5px;
    height: 200px;
    font-size: 12px;
    font-family: ${(props) => props.theme.fontFamily};
  }
  .titulo {
    margin-top: 10px;
    width: 80%;
    border-bottom: 2px solid red;
    padding: 5px;
  }
  .container {
    width: 100%;
    display: flex;
    gap: 30px;
  }

  .orientador {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .disciplina {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .radio {
    display: flex;
    justify-content: left;
    padding: 2px 0 0 0;
    gap: 10px;
  }

  .radioErrorDiv {
    text-align: left;
  }

  .disciplina input {
    width: 20px;
    justify-content: left;
  }

  .radio label {
    font-weight: 400;
  }

  .participante {
    gap: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
  }

  .addPart {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .addTia {
    width: 25%;
    font-family: ${(props) => props.theme.fontFamily};
  }
  .inputTia {
    display: flex;
    gap: 10px;
    flex-direction: column;
    width: 25%;
    font-family: ${(props) => props.theme.fontFamily};
  }

  .botaoDelete {
    aspectratio: 1/1;
    height: 20px;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  #botaoAdd {
    background-color: ${(props) => props.theme.cores.primarias.a};
    border-radius: 90px;
    font-weight: 400;
    font-size: 14px;
    border: none;
    cursor: pointer;
    color: #ffffff;
    padding: 5px 20px;
    :hover {
      background-color: ${(props) => props.theme.cores.secundarias.b};
      transform: scale(1.1);
    }
    font-family: ${(props) => props.theme.fontFamily};
  }

  @media (max-width: 650px) {
    .participante label {
      align-self: center;
      text-align: center;
    }
    .addPart {
      display: flex;
      justify-content: center;
    }
    #botaoAdd {
      padding: 2px 10px;
    }
    .addTia {
      align-items: center;
      font-family: ${(props) => props.theme.fontFamily} input {
        font-family: ${(props) => props.theme.fontFamily};
      }
    }
    .addTia input {
      align-self: center;
      width: 90%;
      font-family: ${(props) => props.theme.fontFamily};
    }

    .inputTia {
      align-self: center;
      width: 15rem;
      font-family: ${(props) => props.theme.fontFamily};
    }
    .radioErrorDiv {
      text-align: center;
    }
  }
  select {
    font-family: ${(props) => props.theme.fontFamily};
  }

  .fonte {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

const projSchema = z.object({
  titulo: z.string().nonempty("O campo é obrigatório!"),
  descrição: z.string().nonempty("O campo é obrigatório"),
  orientador: z.string().nonempty("Selecione o seu Orientador!"),
});

export const FormProjeto = ({ atualizarEstadoDaTela }: any) => {
  const [inputs, setInputs]: any = useState([]);
  const [participante, setParticipante] = useState();
  const [participantes, setParticipantes]: any = useState([]);
  const [orientadores, setOrientadores] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errTia, setErrTia] = useState("");
  const [alertaMsg, setAlertaMsg] = useState("");

  async function postForm(data: any, participantes: any) {
    setIsLoading(true);
    try {
      const response = await axios.post("/projeto", {
        titulo: data.titulo,
        descricao: data.descrição,
        orientador: data.orientador,
        participantes: participantes,
      });
      console.log(response.data);
      if (response.status === 201) {
        console.log(response.data.id);
        atualizarEstadoDaTela(false, response.data.id);
      }
    } catch (err) {
      console.log(err);
      setAlertaMsg("Erro ao criar projeto!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaMsg(""), 3000);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(projSchema) });

  const adicionarInputTia = async (event: any) => {
    setIsSearching(true);
    event.preventDefault();
    try {
      if (participante === sessionStorage.getItem("usuario")) {
        setErrTia("Não é necessario adicionar seu tia!");
        return;
      }
      if (participantes.includes(participante)) {
        setErrTia("Aluno ja adicionado!");
        return;
      }
      if (participantes.length < 3) {
        const response = await axios.get(`/aluno/${participante}`);
        const aluno = response.data;
        setParticipantes([...participantes, aluno.tia]);
        setInputs([...inputs, aluno.nome]);
        setErrTia("");
      } else return;
    } catch (err: any) {
      if (err.response.status === 404) {
        setErrTia("Aluno não encontrado!");
        return;
      }
      if (err.response.status === 409) {
        setErrTia("Aluno de etapa diferente!");
        return;
      }
    } finally {
      setIsSearching(false);
    }
  };

  const removerInput = (index: any) => {
    const novosInputs = [...inputs];
    novosInputs.splice(index, 1);

    const novosParticipantes = [...participantes];
    novosParticipantes.splice(index, 1);

    setInputs(novosInputs);
    setParticipantes(novosParticipantes);
  };

  const onSubmit = (data: any) => {
    postForm(data, participantes);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const professores = await axios.get("/professor/orientador");
        setOrientadores(professores.data.sort());
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {alertaMsg && <AlertaFalha texto={alertaMsg} />}

      <DivProjeto>
        {isLoading ? (
          <Overlay $isLoading>
            <Loader />
          </Overlay>
        ) : (
          ""
        )}
        <div className="titulo">
          Bem vindo ao Oriente!<br></br>
          Para continuar, adicione seu projeto de TCC.
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tituloInput">
            <label>Título:</label>
            <input type="text" {...register("titulo")} />
            {errors.titulo && <ErroSpan message={errors.titulo.message} />}
          </div>
          <div className="tituloInput">
            <label>Descrição:</label>
            <textarea style={{ resize: "none" }} {...register("descrição")} />
            {errors.descrição && (
              <ErroSpan message={errors.descrição.message} />
            )}
          </div>

          <div className="container">
            <div className="orientador">
              <label> Orientador: </label>
              <select {...register("orientador")}>
                <option value=""></option>
                {orientadores.map((elem, i) => {
                  return (
                    <option key={i} value={elem}>
                      {elem}
                    </option>
                  );
                })}
              </select>
              {errors.orientador && (
                <ErroSpan message={errors.orientador.message} />
              )}
            </div>
          </div>
          <div className="participante">
            <label>Adicionar novos participantes</label>
            {errTia && <ErroSpan message={errTia} />}
            <div className="addPart">
              <div className="addTia">
                <input
                  type="text"
                  placeholder="TIA:"
                  className="fonte"
                  onChange={(event: any) => setParticipante(event.target.value)}
                />
              </div>
              <button id="botaoAdd" onClick={adicionarInputTia}>
                Adicionar +
              </button>
              {isSearching ? <Loader2 /> : ""}
            </div>
            <div className="inputTia">
              {inputs.map((inputs: any, index: any) => (
                <div style={{ display: "flex", gap: "10px" }} key={index}>
                  <input readOnly disabled value={inputs} className="fonte" />
                  <img
                    src="../images/trash-bin.png"
                    alt=""
                    className="botaoDelete"
                    onClick={() => removerInput(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Botao text="Criar projeto" tipo="submit" className="botaoAdd" />
          </div>
        </form>
      </DivProjeto>
    </>
  );
};
