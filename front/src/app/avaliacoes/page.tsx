import styled from "styled-components";
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { Questionario } from "@/components/Quiz/Quiz";
import { HomeProf } from "@/components/Home/HomeProf";
import { useEffect } from "react";
import axios from "@/utils/axiosConfig";
import { useState } from "react";
import { TabelaAvaliacao } from "@/components/Tables/TabelaAvaliacao";
import { VisualizaçãoProj } from "@/components/Project/VisualizaçãoProj";
import Loader from "@/components/Loader/Loader";

const Filter = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 25px;
`;

function TelaAvaliacoes() {
  const [sessoes, setSessoes] = useState([]);
  const [projOrientador, setProjOrientador] = useState([]);
  const [filtradoOrentador, setFiltradoOrientador] = useState([]);
  const [filtradoAvaliador, setFiltradoAvaliador] = useState([]);
  const [filtradoSuplente, setFiltradoSuplente] = useState([]);
  const [projAvaliador, setProjAvaliador] = useState([]);
  const [projSuplente, setProjSuplente] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [selectedId, setId]: any = useState("");
  const [tcc, setTcc] = useState("tcc1");
  const [selectedSessao, setSelectedSessao] = useState("todos");

  function handleClick(id: any) {
    setId(id), setVisibility(true);
  }

  useEffect(() => {
    async function getProjetos() {
      setIsLoading(true);
      try {
        const response = await axios.get("nota/avaliacoes");
        if (response.status === 200) {
          setSessoes(response.data.sessoes);
          const orientando = response.data.projetos.filter(
            (item: any) => item.role === "orientador"
          );
          setFiltradoOrientador(
            orientando &&
              orientando.filter((element: any) => element.disciplina === "TCCI")
          );
          setProjOrientador(orientando);
          const avaliador = response.data.projetos.filter(
            (item: any) => item.role === "avaliador"
          );
          setFiltradoAvaliador(
            avaliador &&
              avaliador.filter((element: any) => element.disciplina === "TCCI")
          );
          setProjAvaliador(avaliador);
          const suplente = response.data.projetos.filter(
            (item: any) => item.role === "suplente"
          );
          setFiltradoSuplente(
            suplente &&
              suplente.filter((element: any) => element.disciplina === "TCCI")
          );
          setProjSuplente(suplente);
          console.log(suplente);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getProjetos();
  }, [visibility]);

  useEffect(() => {
    const projOrienta =
      projOrientador &&
      projOrientador.filter(
        (element: any) => element.disciplina === (tcc === "tcc1" ? "TCCI" : "TCCII")
      );

    const projAvalia =
      projAvaliador &&
      projAvaliador.filter(
        (element: any) => element.disciplina === (tcc === "tcc1" ? "TCCI" : "TCCII")
      );

    const projSuplen =
      projSuplente &&
      projSuplente.filter(
        (element: any) => element.disciplina === (tcc === "tcc1" ? "TCCI" : "TCCII")
      );

    if (selectedSessao === "todos") {
      setFiltradoAvaliador(projAvalia);
      setFiltradoOrientador(projOrienta);
      setFiltradoSuplente(projSuplen);
      return;
    }
    setFiltradoOrientador(
      projOrienta &&
        projOrienta.filter((element: any) => element.idSessao == selectedSessao)
    );
    setFiltradoAvaliador(
      projAvalia &&
        projAvalia.filter((element: any) => element.idSessao == selectedSessao)
    );
    setFiltradoSuplente(
      projSuplen &&
        projSuplen.filter((element: any) => element.idSessao == selectedSessao)
    );
  }, [tcc, selectedSessao]);
  return (
    <ProvedorTema>
      <Estilos />
      <HomeProf>
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
            Avaliações
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {visibility ? (
              <>
                <VisualizaçãoProj
                  idProjeto={selectedId.id}
                  status={selectedId.avaliado}
                  mudaVisibilidade={setVisibility}
                />
              </>
            ) : (
              <>
                <Filter>
                  <select
                    onChange={(e) => setSelectedSessao(e.target.value)}
                  >
                    <option
                      selected={selectedSessao === "todos" ? true : false}
                      value="todos"
                    >
                      Todos
                    </option>
                    {sessoes.map((element: any, index) => {
                      return (
                        <option
                          key={index}
                          value={element.id}
                          selected={
                            selectedSessao === element.id ? true : false
                          }
                        >{`${element.data} ${element.hora}`}</option>
                      );
                    })}
                  </select>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        name="tcc"
                        id="tcc1"
                        checked={tcc === "tcc1"}
                        onClick={() => setTcc("tcc1")}
                      />
                      <label htmlFor="tcc1">TCCI</label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        name="tcc"
                        id="tcc2"
                        checked={tcc === "tcc2"}
                        onClick={() => setTcc("tcc2")}
                      />
                      <label htmlFor="tcc2">TCCII</label>
                    </div>
                  </div>
                </Filter>
                <div>
                  <h2>Avaliar como Orientador</h2>
                </div>
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <TabelaAvaliacao
                    projeto={filtradoOrentador}
                    handleClick={handleClick}
                    sessao={sessoes}
                  />
                </div>
                <div>
                  <h2>Avaliar como Avaliador</h2>
                </div>
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <TabelaAvaliacao
                    projeto={filtradoAvaliador}
                    handleClick={handleClick}
                  />
                </div>
                <div>
                  <h2>Avaliar como Suplente</h2>
                </div>
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <TabelaAvaliacao
                    projeto={filtradoSuplente}
                    handleClick={handleClick}
                  />
                </div>
              </>
            )}
          </>
        )}
      </HomeProf>
    </ProvedorTema>
  );
}

export default TelaAvaliacoes;
