import React, { useState, useEffect, useContext } from "react";
import { ProjContext } from "@/context/useContext";
import axios from "@/utils/axiosConfig";
import Loader from "@/components/Loader/Loader";
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { CardNotificacao } from "@/components/Card/CardNotificacao";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { Botao } from "@/components/Button/Button";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeBase } from "@/components/Home/Home";
import { HomeProf } from "@/components/Home/HomeProf";
import { NotificacaoAvaliador } from "@/components/Notifications/NotificacaoAvaliador";
import { NotificacaoParticipacao } from "@/components/Notifications/NotificacaoParticipacao";
import { NotificacaoRecusado } from "@/components/Notifications/NotificacaoRecusado";
import { NotificacaoRecusadoAluno } from "@/components/Notifications/NotificacaoRecusadoAluno";
import { NotificacaoAceiteOrientador } from "@/components/Notifications/NotificacaoAceiteOrientador";
import { NotificacaoSuplente } from "@/components/Notifications/NotificacaoSuplente";
import { NotificacaoRecusadoSuplente } from "@/components/Notifications/NotificacaoRecusadoSuplente";
import { NotificacaoRecusadoAvaliador } from "@/components/Notifications/AlertaRecusadoAvaliador";
import { Alerta } from "@/components/Alerts/Alert";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import { NotificacaoOrientador } from "@/components/Notifications/NotificacaoOrientador";

const Notificacoes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alertaMsg, setAlertaMsg] = useState("");
  const [errMsg, setErr] = useState("");
  const [alertaErr, setAlertaErr] = useState("");
  const [notificacoes, setNotificacoes] = useState([]);
  const [notificacoesAceitas, setNotificacoesAceitas]: any = useState([]);
  const permissao = sessionStorage.getItem("permissao");
  const usuario = sessionStorage.getItem("usuario");

  const { alertaTxt }: any = useContext(ProjContext);

  const vincularAluno = async (idProjeto: any, idNotif: any) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/aluno/projeto/${idProjeto}`);
      console.log(res.status);
      if (res.status === 200) {
        setIsLoading(false);
        setAlertaMsg(res.data.msg);
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
      }
    } catch (err: any) {
      if (!err.response) {
        setAlertaErr("Não foi possível processar a solicitação!");
        return;
      }
      if (err.response.data.msg === "Você já possui projeto!") {
        setAlertaErr(err.response.data.msg);
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
        return;
      }
      if (err.response.data.msg === "Notificacao desatualizada") {
        setAlertaMsg("Notificação desatualizada, vamos remove-la para você!");
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
        return;
      }
      setAlertaErr(err.response.data.msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaMsg(""), 3000);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  async function recusarProj(idProjeto: any, idNotif: any, tipo: any) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/projetoRecusado/${tipo}/${idProjeto}/${idNotif}`
      );
      if (res.status === 200) {
        setAlertaMsg("Projeto Recusado com sucesso!");
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
      }
    } catch (err) {
      console.log(err);
      setAlertaErr("Falha ao recusar projeto!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaMsg(""), 3000);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  }
  const vincularProfessor = async (idProjeto: any, tipo: any, idNotif: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/professor/projeto/${tipo}/${idProjeto}`
      );

      console.log(response.status);
      if (response.status === 201) {
        setIsLoading(false);
        setAlertaMsg(response.data.msg);
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
      }
    } catch (err: any) {
      if (err.response.data.msg === "Notificacao desatualizada") {
        setAlertaMsg("Notificação desatualizada, vamos remove-la para você!");
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
        return;
      } else {
        console.log(err);
        setAlertaErr(err.response.data.msg);
        console.log(err.response.data.msg);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaMsg(""), 3000);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  const recusarProjeto = async (idProjeto: any, path: any, idNotif: any) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/projetoRecusado/${idProjeto}/${path}`);
      if (res.status === 200) {
        setIsLoading(false);
        setAlertaMsg(res.data.msg);
        setNotificacoesAceitas([...notificacoesAceitas, idNotif]);
      }
    } catch (err: any) {
      if (!err.response) {
        setAlertaErr("Não foi possível processar a solicitação!");
        return;
      }
      setAlertaErr("Falha ao realizar operação!");
      setAlertaErr(err.response.data.msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaMsg(""), 3000);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  const apagarRecusado = async (idNotificacao: any) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `/projetoRecusado/aluno/${idNotificacao}`
      );
      if (response.status === 200) {
        setIsLoading(false);
        setNotificacoesAceitas([...notificacoesAceitas, idNotificacao]);
      }
    } catch (err: any) {
      if (!err.response) {
        setAlertaErr("Não foi possível processar a solicitação!");
        return;
      }
      setAlertaErr("Falha ao realizar operação!");
      setAlertaErr(err.response.data.msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlertaErr(""), 3000);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get(`/notificacoes/${permissao}`, {
        timeout: 10000,
      });
      setNotificacoes(response.data);
      setIsLoading(false);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setErr(err?.response?.data?.msg);
      }
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  function NotificacoesComponent({ notificacoes, errMsg }: any) {
    const notificacoesPendentes = notificacoes.filter(
      (notificacao: any) => !notificacoesAceitas.includes(notificacao.id)
    );

    if (errMsg) {
      return (
        <>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "left",
            }}
          >
            <div
              style={{
                width: "100%",
                fontSize: "24px",
                fontWeight: "500",
                borderBottom: "3px solid red",
                textAlign: "left",
                // width: "auto",
                padding: "0 7px 0 0",
                alignSelf: "left",
              }}
            >
              Notificações
            </div>
          </div>
          {alertaTxt && <Alerta texto={alertaTxt} />}
          <h3>{errMsg}</h3>
        </>
      );
    }

    return (
      <>
        <div style={{ display: "flex", width: "80%", justifyContent: "left" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "500",
              borderBottom: "3px solid red",
              textAlign: "left",
              width: "auto",
              padding: "0 7px 0 0",
            }}
          >
            Notificações
          </div>
        </div>
        {alertaTxt && <Alerta texto={alertaTxt} />}
        {alertaMsg && <Alerta texto={alertaMsg} />}
        {alertaErr && <AlertaFalha texto={alertaErr} />}
        {isLoading ? (
          <div style={{ padding: "60px" }}>
            <Loader />
          </div>
        ) : (
          notificacoesPendentes.map((notificacao: any) => {
            if (notificacao.tipo === "participante") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoParticipacao
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      path="aluno"
                      tipo="aluno"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="Aceitar"
                        onClick={() =>
                          vincularAluno(notificacao.projeto.id, notificacao.id)
                        }
                      />
                      <Botao
                        text="Recusar"
                        onClick={() =>
                          recusarProjeto(
                            notificacao.projeto.id,
                            "aluno",
                            notificacao.id
                          )
                        }
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "orientador") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                    }}
                  >
                    <NotificacaoOrientador
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      idNotif={notificacao.id}
                      tipo="orientador"
                      path="professor"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="Aceitar"
                        onClick={() =>
                          vincularProfessor(
                            notificacao.projeto.id,
                            "orientador",
                            notificacao.id
                          )
                        }
                      />
                      <Botao
                        text="Recusar"
                        onClick={() =>
                          recusarProjeto(
                            notificacao.projeto.id,
                            "professor",
                            notificacao.id
                          )
                        }
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "suplente") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div style={{ width: "100%", alignSelf: "center" }}>
                    <NotificacaoSuplente
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      idNotif={notificacao.id}
                      tipo="suplente"
                      path="professor"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="Aceitar"
                        onClick={() =>
                          vincularProfessor(
                            notificacao.projeto.id,
                            "suplente",
                            notificacao.id
                          )
                        }
                      />
                      <Botao
                        text="Recusar"
                        onClick={() =>
                          recusarProj(
                            notificacao.projeto.id,
                            notificacao.id,
                            "suplente"
                          )
                        }
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "avaliador") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div style={{ width: "100%", alignSelf: "center" }}>
                    <NotificacaoAvaliador
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      idNotif={notificacao.id}
                      tipo="avaliador"
                      path="professor"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="Aceitar"
                        onClick={() =>
                          vincularProfessor(
                            notificacao.projeto.id,
                            "avaliador",
                            notificacao.id
                          )
                        }
                      />
                      <Botao
                        text="Recusar"
                        onClick={() =>
                          recusarProj(
                            notificacao.projeto.id,
                            notificacao.id,
                            "avaliador"
                          )
                        }
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "projeto_recusado_professor") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoRecusado nome={notificacao.remetente} />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="OK"
                        onClick={() => apagarRecusado(notificacao.id)}
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "projeto_recusado_aluno") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoRecusadoAluno nome={notificacao.remetente} />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="OK"
                        onClick={() => apagarRecusado(notificacao.id)}
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "aceiteOrientador") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoAceiteOrientador nome={notificacao.remetente} />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="OK"
                        onClick={() => apagarRecusado(notificacao.id)}
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "projeto_recusado_suplente") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoRecusadoSuplente
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      idNotif={notificacao.id}
                      tipo="recusado"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="OK"
                        onClick={() => apagarRecusado(notificacao.id)}
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
            if (notificacao.tipo === "projeto_recusado_avaliador") {
              return (
                <CardNotificacao key={notificacao.id}>
                  <div
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      padding: "0 20px 0 0",
                    }}
                  >
                    <NotificacaoRecusadoAvaliador
                      nome={notificacao.remetente}
                      projeto={notificacao.projeto.titulo}
                      idProjeto={notificacao.projeto.id}
                      idNotif={notificacao.id}
                      tipo="recusado"
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BotaoVerde
                        text="OK"
                        onClick={() => apagarRecusado(notificacao.id)}
                      />
                    </div>
                  </div>
                </CardNotificacao>
              );
            }
          })
        )}
      </>
    );
  }

  return (
    <ProvedorTema>
      <Estilos />
      {permissao === "professor" ? (
        <HomeProf>
          <NotificacoesComponent notificacoes={notificacoes} errMsg={errMsg} />
        </HomeProf>
      ) : (
        <HomeBase>
          <NotificacoesComponent notificacoes={notificacoes} errMsg={errMsg} />
        </HomeBase>
      )}
    </ProvedorTema>
  );
};

export default Notificacoes;
