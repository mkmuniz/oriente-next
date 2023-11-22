import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "../../utils/axiosConfig";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { Botao } from "@/components/Button/Button";
import { ProjContext } from "../../context/useContext";
import { AlertaFalha } from "@/components/Alerts/FailAlert";

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
  }

  .profs {
    display: flex;
  }

  .orientador {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
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
    .titulo {
      width: 98%;
      text-align: center;
      justify-content: center;
      font-weight: 500;
      font-size: 27px;
    }
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

  @media (max-width: 650px) {
    .titulo {
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
  }
`;

export const VerProjeto = ({ idProjeto, mudaVisibilidade, openedFromList }: any) => {
  const { projId, path, tipo, idNotif, setTxt }: any = useContext(ProjContext);
  const [isLoading, setIsLoading] = useState(false);
  const [projeto, setProjeto]: any = useState({});
  const [orientador, setOrientador]: any = useState({});
  const [suplente, setSuplente]: any = useState("");
  const [avaliador, setAvaliador]: any = useState([]);
  const [alertaErr, setAlertaErr] = useState("");
  const [display, setDisplay] = useState("");
  const router = useRouter();
  const usuario = sessionStorage.getItem("usuario");

  const vincularProfessor = async () => {
    setIsLoading(true);
    try {
      console.log(tipo);
      const res = await axios.post(`/professor/projeto/${tipo}/${projId}`);

      console.log(res.status);
      if (res.status === 201) {
        setTxt("Professor vinculado com sucesso!");
        setTimeout(() => setTxt(""), 3000);
        setIsLoading(false);
        router.push("/notificacoes");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.msg === "Notificacao desatualizada") {
        setTxt("Notificação desatualizada, vamos remove-la para você!");
        setTimeout(() => setTxt(""), 3000);
        setIsLoading(false);
        router.push("/notificacoes");
        return;
      }

      setAlertaErr("Falha ao vincular professor!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  const vincularAluno = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/aluno/projeto/${projId}`);
      console.log(res.status);
      if (res.status === 200) {
        setTxt("Aluno vinculado com sucesso!");
        setTimeout(() => setTxt(""), 3000);
        setIsLoading(false);
        router.push("/notificacoes");
      }
    } catch (err: any) {
      if (!err.response) {
        setAlertaErr("Não foi possível processar a solicitação!");
        return;
      }
      if (err.response.data.msg === "Você já possui projeto!") {
        setAlertaErr(err.response.data.msg);
      }
      if (err.response.data.msg === "Notificacao desatualizada") {
        setTxt("Notificação desatualizada, vamos remove-la para você!");
        setTimeout(() => setTxt(""), 3000);
        setIsLoading(false);
        router.push("/notificacoes");
        return;
      }
      console.log(err.name);
      setAlertaErr(err.response.data.msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  const recusarProjeto = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/projetoRecusado/${projId}/${path}`);
      if (res.status === 200) {
        setIsLoading(false);
        setTxt("Projeto recusado com sucesso!");
        setTimeout(() => setTxt(""), 3000);
        router.push("/notificacoes");
      }
    } catch (err) {
      setAlertaErr("Falha ao realizar operação!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  async function recusarProj() {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/projetoRecusado/${tipo}/${projId}/${idNotif}`
      );
      if (res.status === 200) {
        setIsLoading(false);
        setTxt("Projeto recusado com sucesso!");
        setTimeout(() => setTxt(""), 3000);
        router.push("/notificacoes");
      }
    } catch (err) {
      console.log(err);
      setAlertaErr("Falha ao recusar projeto!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaErr(""), 3000);
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

  useEffect(() => {
    async function getProjeto() {
      setIsLoading(true);

      try {
        const res = await axios.get(`/getProjeto/${idProjeto}`);
        if (res.status === 200) {
          setProjeto(res.data);
          console.log(res.data);
          carregarProfessores(res?.data?.professor);
        }
      } catch (err) {
        console.log(err);
        router.push("/notificacoes");
      } finally {
        setIsLoading(false);
      }
    }
    getProjeto();
  }, []);

  return (
    <>
      {alertaErr && <AlertaFalha texto={alertaErr} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="cabecalho">
            <div className="titulo">
              <span>{projeto.titulo}</span>
            </div>
            <div
              className="fechar"
              style={{ display }}
              onClick={() => window.history.back()}
            >
              <img src="../../images/voltar.png" />
            </div>
          </div>
          <div className="descricao">
            <h1>Descrição</h1>
            <span>{projeto.descricao}</span>
          </div>
          <div className="cronogramas">
            <div className="orientacao">
              <div className="tituloOrientacao">
                <h1>Cronograma de orientação</h1>
                <div className="divEditar">
                  {openedFromList && (
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
                <div className="divEditar">
                  {openedFromList && (
                    <img className="editar" src="../../images/pencil.png" />
                  )}
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
              <h1>Orientador</h1>
              <span>
                {" "}
                {orientador.nome}{" "}
                {orientador.status === "aguardando" ? "⏳" : "✅"}{" "}
              </span>
            </div>
            <div className="avaliador">
              <div className="tituloAvaliadores">
                <h1>Avaliadores</h1>
                <div className="divEditar">
                  {openedFromList && (
                    <img className="editar" src="../../images/pencil.png" />
                  )}
                </div>
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
                <div className="divEditar">
                  {openedFromList && (
                    <img className="editar" src="../../images/pencil.png" />
                  )}
                </div>
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
            <h1>Equipe</h1>
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
                        <span>
                          {elem.turma === "aguardando" ? " ⏳" : " ✅"}
                        </span>
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
        </Container>
      )}
      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        {!isLoading && tipo !== "recusado" && (
          <>
            <BotaoVerde
              text="Aceitar"
              onClick={tipo === "aluno" ? vincularAluno : vincularProfessor}
            />
            <Botao
              text="Recusar"
              onClick={
                tipo === "orientador" || tipo === "aluno"
                  ? recusarProjeto
                  : recusarProj
              }
            />
          </>
        )}
        {!isLoading && tipo === "recusado" && (
          <BotaoVerde text="Editar" onClick={() => router.push("/meusProjetos")} />
        )}
      </div>
    </>
  );
};
