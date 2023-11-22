import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";
import Loader from "../Loader/Loader";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { CronogramaOrientacao } from "../Forms/CronogramaOrientacao";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import { Alerta } from "@/components/Alerts/Alert";
import { EditarEquipe } from "../Forms/EditaEquipe";
import { ProjContext } from "../../context/useContext";
import { useContext } from "react";

const Container = styled.div`
  width: 80%;
  display: flex;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
  flex-direction: column;
  gap: 15px;
  h1 {
    font-size: 20px;
  }

  .descricao {
    display: flex;
    flex-direction: column;
    text-align: justify;
    gap: 5px;
  }

  .tituloDescricao {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    gap: 5px;
  }
  .tituloEquipe {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .profs {
    display: flex;
  }

  .orientador {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    .tituloOrientador {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      h1 {
        width: 90%;
      }
      display: flex;
      align-items: center;
    }
  }

  .avaliador {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #cc0c1c;
    border-left: 1px solid #cc0c1c;
    width: 33%;
    padding: 0 7px;
  }

  .tituloAvaliadores {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    h1 {
      width: 90%;
    }
  }

  .suplente {
    display: flex;
    flex-direction: column;
    width: 33%;
    .tituloSuplente {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      h1 {
        width: 90%;
      }
      display: flex;
      align-items: center;
    }
  }

  #avaliador2 {
    margin-top: 5px;
  }

  .cronogramas {
    display: flex;
    flex-direction: row;
  }

  .orientacao {
    width: 50%;
    border-right: 1px solid #cc0c1c;

    .tituloOrientacao {
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        width: 90%;
      }
    }

    .textoOrientacao {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;
    }
  }

  .avaliacao {
    width: 50%;
    .tituloAvaliacao {
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        width: 90%;
      }
    }
  }

  .textoAvaliacao {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .equipe {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .tituloProjeto {
    display: flex;
  }

  .tituloAluno {
    width: 49%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .tituloTia {
    width: 19.5%;
  }

  .tituloTurma {
    width: 20%;
  }

  .status {
    width: 11.5%;
  }

  .conteudoLista {
    display: flex;
    border-top: 1px solid #cc0c1c;
    padding: 15px 0;
  }

  .nomeAluno {
    width: 50%;
  }

  .tia {
    width: 20%;
  }

  .turma {
    width: 20%;
    padding: 0 3px;
  }

  .status {
    width: 10%;
  }

  .nota h1 {
    font-size: 35px;
  }

  .cabecalho {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    img {
      width: 18px;
      height: 18px;
    }
  }

  .titulo {
    width: 95%;
    text-align: center;
    justify-content: center;
    display: flex;
    font-weight: 500;
    font-size: 27px;
    gap: 3px;
  }

  .fechar {
    display: flex;
    justify-content: right;
    img {
      cursor: pointer;
    }
    :hover {
      transform: scale(1.3);
      transition: all 0.5s;
    }
  }

  .editar {
    height: 18px;
    width: 18px;
    padding: 0px 2px;
    cursor: pointer;
    opacity: 0.5;
    :hover {
      transform: scale(1.2);
      transition: all 0.5s;
    }
  }

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

    input {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      border-radius: 6px;
      border: 0.1px solid #ccc;
      padding: 2px;
    }

    textarea {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      border-radius: 6px;
      border: 0.1px solid #ccc;
      padding: 2px;
      resize: none;
      height: 100px;
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
    .botao-equipe {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }

    span {
      font-size: 20px;
      width: 100%;
      text-align: left;
      font-weight: 500;
    }
  }

  .itensCronograma {
    font-weight: 500;
  }

  @media (max-width: 650px) {
    .titulo {
      // flex-direction: row-reverse;

      span {
        font-size: 18px;
      }
    }

    h1 {
      font-size: 12px;
    }

    span {
      font-size: 12px;
    }

    .orientador {
      padding-right: 5px;
    }
    .tituloAluno {
      width: 45%;
    }
    .nomeAluno {
      width: 45%;
    }

    .tia {
      display: flex;
      margin-left: 5px;
      align-items: center;
    }

    .turma {
      display: flex;

      align-items: center;
    }
    .status {
      width: 15.5%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avaliacao {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 0 0 3px;
    }
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

export const DescricaoProjeto = ({
  idProjeto,
  mudaVisibilidade,
  openedFromList,
}: any) => {
  const { setTxt }: any = useContext(ProjContext);
  const [isLoading, setIsLoading] = useState(false);
  const [projeto, setProjeto]: any = useState({});
  const [avaliadores, setAvaliadores]: any = useState([]);
  const [orientador, setOrientador]: any = useState({});
  const [orientadores, setOrientadores]: any = useState([]);
  const [suplente, setSuplente]: any = useState("");
  const [avaliador, setAvaliador]: any = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [display, setDisplay] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [editaProjeto, setEditaProjeto]: any = useState({});
  const [msgSucesso, setSucesso] = useState("");
  const [selectedAvaliacao, setSelectedAvaliacao] = useState("");
  const [selectedSuplente, setSelectedSuplente] = useState("");
  const [selectedAvaliadores, setSelectedAvaliadores]: any = useState([]);
  const [selectedOrientador, setSelectedOrientador] = useState({});
  const [msgErro, setErro] = useState("");
  const coordenador =
    sessionStorage.getItem("permissao") === "coordenador" ? true : false;
  const professor =
    sessionStorage.getItem("permissao") === "professor" ? true : false;

  async function handleOpenModal(tipo: any) {
    setIsModalOpen(true);
    setTipo(tipo);
    setSelectedSuplente(suplente.nome);
    setSelectedOrientador(orientador.nome);
    setSelectedAvaliacao(projeto?.sessao?.id);
    setEditaProjeto(projeto);
    setSelectedAvaliadores(avaliador);
  }

  async function excluirProjeto() {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/projeto/${idProjeto}`);
      console.log(response);
      if (response.status === 200) {
        setTxt("Projeto Excluido!");
        setTimeout(() => setTxt(""), 3000);
        mudaVisibilidade(false, "");
      }
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 404) {
        setErro("Projeto Não encontrado!");
        return;
      }
      setErro("Falha ao excluir projeto!");
    } finally {
      handleCloseModal();
      setIsLoading(false);
      setTimeout(() => setErro(""), 3000);
    }
  }

  function carregarProfessores(professores: any) {
    const avaliadores = professores
      .filter((elem: any) => elem.papel === "avaliador")
      .map((elem: any) => elem);

    if (avaliadores.length > 0) {
      setAvaliador(avaliadores);
    } else {
      setAvaliador("");
    }

    const orientador = professores.find((elem: any) => elem.papel === "orientador");
    if (orientador) {
      setOrientador(orientador);
    } else {
      setOrientador("");
    }

    const suplente = professores.find((elem: any) => elem.papel === "suplente");
    if (suplente) {
      setSuplente(suplente);
    } else {
      setSuplente("");
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function handleUpdateAvaliador(value: any, index: any) {
    let suportArray: any = [...selectedAvaliadores];
    suportArray[index] = {
      nome: value,
      papel: "avaliador",
    };
    setSelectedAvaliadores(suportArray);
  }

  async function notificarAvaliadores() {
    setIsLoading(true);
    try {
      if (!selectedAvaliadores[0] && !selectedAvaliadores[1]) {
        handleCloseModal();
        setErro("Escolha dois orientadores!");
        return;
      }
      if (!selectedAvaliadores[0] || !selectedAvaliadores[1]) {
        handleCloseModal();
        setErro("Escolha dois orientadores!");
        return;
      }

      if (
        orientador.nome === selectedAvaliadores[0].nome ||
        orientador.nome === selectedAvaliadores[1].nome
      ) {
        setErro("Professor já relacionado ao projeto!");
        handleCloseModal();
        return;
      }
      if (selectedAvaliadores[0].nome === selectedAvaliadores[1].nome) {
        setErro("Selecione avaliadores diferentes");
        handleCloseModal();
        return;
      }
      const response = await axios.post("/notificacao/avaliador", {
        avaliadores: [selectedAvaliadores[0].nome, selectedAvaliadores[1].nome],
        idProjeto: idProjeto,
        remetente: sessionStorage.getItem("nome"),
      });
      if (response.status === 200) {
        setSucesso("Notificação enviada com sucesso!");
        carregarProfessores(response?.data?.professor);
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setErro(""), 3000);
      setTimeout(() => setSucesso(""), 3000);
    }
  }

  function fechaProjeto() {
    mudaVisibilidade(false, "");
    setDisplay("none");
  }
  async function atualizaSuplente() {
    setIsLoading(true);

    try {
      if (!selectedSuplente) {
        return;
      }
      if (orientador.nome === selectedSuplente) {
        setErro("Professor já relacionado ao projeto!");
        handleCloseModal();
        return;
      }
      const response = await axios.post("/notificacao/suplente", {
        nome: selectedSuplente,
        idProjeto,
        remetente: sessionStorage.getItem("nome"),
      });
      if (response.status === 200) {
        handleCloseModal();
        carregarProfessores(response?.data?.professor);
        setSucesso("Notificação enviada com sucesso!");
      }
    } catch (err: any) {
      handleCloseModal();
      setErro(err.response.data.msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => setErro(""), 3000);
      setTimeout(() => setSucesso(""), 3000);
    }
  }

  async function atualizaOrientador() {
    setIsLoading(true);
    try {
      if (selectedOrientador === "") {
        return;
      }
      const response = await axios.post("/notificacao/edit/orientador", {
        nome: selectedOrientador,
        idProjeto,
        remetente: sessionStorage.getItem("nome"),
      });
      if (response.status === 200) {
        handleCloseModal();
        carregarProfessores(response?.data?.professor);
        setSucesso("Notificação enviada com sucesso!");
      }
    } catch (err: any) {
      handleCloseModal();
      setErro(err.response.data.msg);
      console.log(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setErro(""), 3000);
      setTimeout(() => setSucesso(""), 3000);
    }
  }

  async function atualizaProjeto() {
    setIsLoading(true);
    try {
      const res: any = await axios.put(`/projeto/${idProjeto}`, editaProjeto);
      if (res.status === 200) {
        setProjeto(editaProjeto);
        setSucesso("Dados atualizados com sucesso!");
      }
    } catch (err: any) {
      if (res?.data?.msg) {
        setErro(res.data.msg);
      } else {
        setErro("Falha ao atualizar!");
      }

      console.log(err);
    } finally {
      setTimeout(() => setSucesso(""), 3000);
      setTimeout(() => setErro(""), 3000);
      setIsLoading(false);
      handleCloseModal();
    }
  }
  function handleCronograma(data: any) {
    setProjeto({ ...projeto, orientacao: data });
  }
  function handleAlunos(data: any) {
    setProjeto({ ...projeto, alunos: data });
  }

  function handleLoading(state: any) {
    setIsLoading(state);
  }

  function handleMsgs(msg: any, type: any) {
    if (type === "falha") {
      setErro(msg);
      setTimeout(() => setErro(""), 3000);
    } else {
      setSucesso(msg);
      setTimeout(() => setSucesso(""), 3000);
    }
  }
  async function atualizaAvaliacao() {
    if (selectedAvaliacao === "") {
      return;
    }
    try {
      setIsLoading(true);
      const response: any = await axios.put(`/sessao/projeto/${idProjeto}`, {
        idSessao: selectedAvaliacao,
      });
      if (response.status === 200) {
        setSucesso(response?.data?.msg);
        setProjeto({ ...projeto, sessao: response.data.sessao });
      }
    } catch (err: any) {
      if (err?.response?.data?.msg) {
        setErro(err.response.data.msg);
      } else {
        setErro("Falha ao atualizar a avaliação.");
      }
    } finally {
      setTimeout(() => setSucesso(""), 3000);
      setTimeout(() => setErro(""), 3000);
      setIsLoading(false);
      handleCloseModal();
    }
  }
  useEffect(() => {
    async function getProjeto() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/getProjeto/${idProjeto}`);
        const profs = await axios.get("/professor/avaliador");
        if (res.status === 200) {
          setProjeto(res.data);
          setSelectedAvaliacao(res?.data?.sessao?.id);
          carregarProfessores(res?.data?.professor);
          console.log(res.data);
        }
        if (profs.status === 200) {
          setAvaliadores(
            profs.data.professores.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
          );
          setOrientadores(
            profs.data.orientadores.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getProjeto();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [projeto]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/sessao/selecionar/${projeto.disciplina}`
        );
        if (response.status === 200) {
          setSessoes(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [projeto]);
  return (
    <>
      {msgErro && <AlertaFalha texto={msgErro} />}
      {msgSucesso && <Alerta texto={msgSucesso} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="cabecalho">
            <div className="titulo">
              <span>{projeto.titulo}</span>
              <div
                className="divEditar"
                onClick={() => {
                  handleOpenModal("titulo");
                }}
              >
                {openedFromList && (coordenador || professor) && (
                  <img className="editar" src="../../images/pencil.png" />
                )}
              </div>
            </div>
            {openedFromList && (
              <div
                className="fechar"
                style={{ display: { display } }}
                onClick={() => fechaProjeto()}
              >
                <img src="../../images/voltar.png" />
              </div>
            )}
          </div>
          <div className="descricao">
            <div className="tituloDescricao">
              <span> Descrição </span>
              <div
                className="divEditar"
                onClick={() => {
                  handleOpenModal("descricao");
                }}
              >
                {openedFromList && (coordenador || professor) && (
                  <img className="editar" src="../../images/pencil.png" />
                )}
              </div>
            </div>
            <span>{projeto.descricao}</span>
          </div>

          <div className="cronogramas">
            <div className="orientacao">
              <div className="tituloOrientacao">
                <h1>Cronograma de orientação</h1>
                <div
                  className="divEditar"
                  onClick={() => {
                    handleOpenModal("cronograma");
                  }}
                >
                  {openedFromList && (coordenador || professor) && (
                    <img className="editar" src="../../images/pencil.png" />
                  )}
                </div>
              </div>
              <div className="textoOrientacao">
                <span>
                  {projeto.orientacao === null ? (
                    "Aguardando definição!"
                  ) : (
                    <>
                      <div className="itensCronograma">
                        <span>
                          {" "}
                          <b> Formato: </b> {projeto.orientacao?.formato}{" "}
                        </span>{" "}
                        <br />
                        <span>
                          {" "}
                          <b> Local: </b> {projeto.orientacao?.local}{" "}
                        </span>{" "}
                        |
                        <span>
                          {" "}
                          <b> Horário: </b> {projeto.orientacao?.horario}{" "}
                        </span>{" "}
                        <br />
                        <span>
                          {" "}
                          <b> Dia da semana: </b>{" "}
                          {projeto.orientacao?.dia_da_semana}{" "}
                        </span>{" "}
                        <br />
                        <span>
                          {" "}
                          <b> Periodicidade: </b>{" "}
                          {projeto.orientacao?.periodicidade}{" "}
                        </span>
                      </div>
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="avaliacao">
              <div className="tituloAvaliacao">
                <h1>Data da banca</h1>
                <div
                  className="divEditar"
                  onClick={() => {
                    handleOpenModal("avaliacao");
                  }}
                >
                  {openedFromList &&
                    ((coordenador && (
                      <img className="editar" src="../../images/pencil.png" />
                    )) ||
                      (!coordenador &&
                        sessionStorage.getItem("sessao_poster") === "true" && (
                          <img
                            className="editar"
                            src="../../images/pencil.png"
                          />
                        )))}
                </div>
              </div>
              <div className="textoAvaliacao">
                <span>
                  {!projeto.sessao ? (
                    "Aguardando definição!"
                  ) : (
                    <>
                      <div className="itensCronograma">
                        <span>
                          {" "}
                          <b> Data: </b> {projeto.sessao?.data}{" "}
                        </span>{" "}
                        <br />
                        <span>
                          {" "}
                          <b> Local: </b> {projeto.sessao?.local}{" "}
                        </span>{" "}
                        |
                        <span>
                          {" "}
                          <b> Horário: </b> {projeto.sessao?.hora}{" "}
                        </span>{" "}
                        <br />
                      </div>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="profs">
            <div className="orientador">
              <div className="tituloOrientador">
                <h1>Orientador</h1>
                {coordenador ? (
                  <img
                    className="editar"
                    src="../../images/pencil.png"
                    style={{ justifyContent: "flex-end" }}
                    onClick={() => handleOpenModal("orientador")}
                  />
                ) : (
                  ""
                )}
              </div>
              <span>
                {orientador.nome}{" "}
                {orientador.status === "aguardando"
                  ? "⏳"
                  : orientador.status === "aceito"
                  ? "✅"
                  : orientador.status === "recusado"
                  ? "❌"
                  : ""}
                {""}
              </span>
            </div>
            <div className="avaliador">
              <div className="tituloAvaliadores">
                <h1>Avaliadores</h1>
                {openedFromList &&
                  (coordenador ||
                    (professor &&
                    sessionStorage.getItem(`${projeto.disciplina}`) === "true"
                      ? true
                      : false)) && (
                    <img
                      className="editar"
                      src="../../images/pencil.png"
                      onClick={() => {
                        handleOpenModal("avaliadores");
                      }}
                    />
                  )}
              </div>
              <span>
                {" "}
                {avaliador.length === 0 ? (
                  "Aguardando definição!"
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {avaliador &&
                      avaliador.map((elem: any, index: any) => {
                        return (
                          <div>
                            {" "}
                            <span id="avaliador2" key={index}>
                              {elem.nome}{" "}
                            </span>
                            {elem.status === "aguardando"
                              ? "⏳"
                              : elem.status === "aceito"
                              ? "✅"
                              : elem.status === "recusado"
                              ? "❌"
                              : ""}
                            {""}
                          </div>
                        );
                      })}
                  </div>
                )}{" "}
              </span>
            </div>
            <div className="suplente">
              <div className="tituloSuplente">
                <h1>Suplente</h1>
                {openedFromList &&
                  (coordenador ||
                    (professor &&
                    sessionStorage.getItem(`${projeto.disciplina}`) === "true"
                      ? true
                      : false)) && (
                    <img
                      className="editar"
                      src="../../images/pencil.png"
                      onClick={() => {
                        handleOpenModal("suplente");
                      }}
                    />
                  )}
              </div>
              {suplente ? (
                <span>
                  {suplente.nome}{" "}
                  {suplente.status === "aguardando"
                    ? "⏳"
                    : suplente.status === "aceito"
                    ? "✅"
                    : suplente.status === "recusado"
                    ? "❌"
                    : ""}
                  {""}
                </span>
              ) : (
                <span>Aguardando definição!</span>
              )}
            </div>
          </div>

          <div className="equipe">
            <div className="tituloEquipe">
              <h1>Equipe</h1>
              {openedFromList && (
                <img
                  className="editar"
                  src="../../images/pencil.png"
                  onClick={() => {
                    handleOpenModal("equipe");
                  }}
                />
              )}
            </div>
            <div className="lista">
              <div className="tituloProjeto">
                <div className="tituloAluno">
                  <h1>Aluno</h1>
                </div>
                <div className="tituloTia">
                  <h1>TIA</h1>
                </div>
                <div className="tituloTurma">
                  <h1>Turma</h1>
                </div>
                <div className="status">
                  <h1>Status</h1>
                </div>
              </div>
              {projeto.alunos && Array.isArray(projeto.alunos)
                ? projeto.alunos.map((elem: any, index: any) => (
                    <div className="conteudoLista" key={index}>
                      <div className="nomeAluno">
                        <span>{elem.nome}</span>
                      </div>
                      <div className="tia">
                        <span>
                          {elem.tia === "aguardando" ? "-" : elem.tia}
                        </span>
                      </div>
                      <div className="turma">
                        <span>
                          {elem.turma === "aguardando" ? "-" : elem.turma}
                        </span>
                      </div>
                      <div className="status">
                        <span>{elem.turma === "aguardando" ? "⏳" : "✅"}</span>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          {projeto.nota !== 0 ? (
            <div className="nota">
              <h1>Nota geral:</h1>
              <h1>{projeto.nota}</h1>
            </div>
          ) : (
            ""
          )}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                {tipo === "titulo" ? (
                  <>
                    <span>Editar título:</span>
                    <input
                      type="text"
                      value={editaProjeto.titulo}
                      onChange={(e) =>
                        setEditaProjeto({
                          ...editaProjeto,
                          titulo: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  " "
                )}

                {tipo === "descricao" ? (
                  <>
                    <span>Editar descrição</span>
                    <textarea
                      type="text"
                      value={editaProjeto.descricao}
                      onChange={(e) =>
                        setEditaProjeto({
                          ...editaProjeto,
                          descricao: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  " "
                )}

                {tipo === "avaliadores" ? (
                  <>
                    <span>Editar avaliadores</span>
                    {projeto.sessao ? (
                      <>
                        <select
                          onChange={(e) =>
                            handleUpdateAvaliador(e.target.value, 0)
                          }
                        >
                          <option value=""></option>
                          {avaliadores &&
                            avaliadores.map((elem, index) => {
                              return (
                                <option
                                  key={index}
                                  value={elem.nome}
                                  selected={
                                    selectedAvaliadores[0]?.nome === elem.nome
                                      ? "selected"
                                      : ""
                                  }
                                >{`${index + 1} - ${elem.nome}`}</option>
                              );
                            })}
                        </select>
                        <select
                          onChange={(e) =>
                            handleUpdateAvaliador(e.target.value, 1)
                          }
                        >
                          <option value=""></option>
                          {avaliadores &&
                            avaliadores.map((elem, index) => {
                              return (
                                <option
                                  key={index}
                                  value={elem.nome}
                                  selected={
                                    selectedAvaliadores[1]?.nome === elem.nome
                                      ? "selected"
                                      : ""
                                  }
                                >{`${index + 1} - ${elem.nome}`}</option>
                              );
                            })}
                        </select>
                      </>
                    ) : (
                      <h3>Defina primeiro a data da banca!</h3>
                    )}
                    <div className="botoes">
                      <Botao text="Fechar" onClick={handleCloseModal} />
                      <BotaoVerde
                        text="Salvar"
                        onClick={notificarAvaliadores}
                      />
                    </div>
                  </>
                ) : (
                  " "
                )}

                {tipo === "suplente" ? (
                  <>
                    <span>Editar suplente</span>
                    {projeto.sessao ? (
                      <select
                        value={selectedSuplente}
                        onChange={(e) => setSelectedSuplente(e.target.value)}
                        defaultValue={suplente.nome}
                      >
                        <option value=""></option>
                        {avaliadores &&
                          avaliadores.map((elem, index) => {
                            return (
                              <option
                                key={index}
                                value={elem.nome}
                                selected={
                                  selectedSuplente === elem.nome
                                    ? true
                                    : false
                                }
                              >{`${index + 1} - ${elem.nome}`}</option>
                            );
                          })}
                      </select>
                    ) : (
                      <h3>Defina primeiro a data da banca!</h3>
                    )}

                    <div className="botoes">
                      <Botao text="Fechar" onClick={handleCloseModal} />
                      <BotaoVerde text="Salvar" onClick={atualizaSuplente} />
                    </div>
                  </>
                ) : (
                  " "
                )}
                {tipo === "orientador" ? (
                  <>
                    <span>Editar orientador</span>

                    <select
                      value={selectedOrientador}
                      onChange={(e) => setSelectedOrientador(e.target.value)}
                      defaultValue={orientador.nome}
                    >
                      <option value=""></option>
                      {orientadores &&
                        orientadores.map((elem, index) => {
                          return (
                            <option
                              key={index}
                              value={elem.nome}
                              selected={
                                selectedOrientador === elem.nome
                                  ? "selected"
                                  : ""
                              }
                            >{`${index + 1} - ${elem.nome}`}</option>
                          );
                        })}
                    </select>

                    <div className="botoes">
                      <Botao text="Fechar" onClick={handleCloseModal} />
                      <BotaoVerde text="Salvar" onClick={atualizaOrientador} />
                    </div>
                  </>
                ) : (
                  " "
                )}
                {tipo === "equipe" ? (
                  <>
                    <EditarEquipe
                      alunos={projeto.alunos}
                      idProjeto={idProjeto}
                      cancelar={handleCloseModal}
                      loading={handleLoading}
                      atualiza={handleAlunos}
                      msg={handleMsgs}
                    />
                  </>
                ) : (
                  " "
                )}

                {tipo === "cronograma" ? (
                  <>
                    <CronogramaOrientacao
                      idProjeto={idProjeto}
                      cancelar={handleCloseModal}
                      cronograma={projeto.orientacao}
                      atualiza={handleCronograma}
                      loading={handleLoading}
                      msg={handleMsgs}
                    />
                  </>
                ) : (
                  " "
                )}
                {tipo === "avaliacao" ? (
                  <>
                    <span>Editar avaliação</span>
                    <select
                      value={selectedAvaliacao}
                      onChange={(e) => setSelectedAvaliacao(e.target.value)}
                      defaultValue={selectedAvaliacao}
                    >
                      <option value=""></option>
                      {sessoes &&
                        sessoes.map((elem, index) => {
                          return (
                            <option
                              key={index}
                              value={elem.id}
                              selected={
                                selectedAvaliacao == elem.id ? "selected" : ""
                              }
                            >{`${index + 1}- ${elem.data} ${elem.hora} - ${
                              elem.local
                            }`}</option>
                          );
                        })}
                    </select>
                    <div className="botoes">
                      <Botao text="Fechar" onClick={handleCloseModal} />
                      <BotaoVerde text="Salvar" onClick={atualizaAvaliacao} />
                    </div>
                  </>
                ) : (
                  " "
                )}
                {tipo === "excluir" ? (
                  <>
                    <span>Excluir Projeto</span>
                    <div>Tem certeza que você quer excluir este projeto?</div>
                    <div className="botoes">
                      <Botao text="Fechar" onClick={handleCloseModal} />
                      <BotaoVerde
                        text="Salvar"
                        onClick={() => excluirProjeto()}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {tipo === "titulo" || tipo === "descricao" ? (
                  <div className="botoes">
                    <Botao text="Fechar" onClick={handleCloseModal} />
                    <BotaoVerde text="Salvar" onClick={atualizaProjeto} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </Container>
      )}
      {isLoading ? (
        ""
      ) : coordenador ? (
        <div>
          <Botao
            text="Excluir"
            onClick={() => {
              handleOpenModal("excluir");
            }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
