import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import axios from "@/utils/axiosConfig";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import Loader from "@/components/Loader/Loader";
import { Alerta } from "@/components/Alerts/Alert";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErroSpan } from "../ErroSpan/ErroSpan";

//tebale

const TabelaContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  background: white;
  font-size: 12px;
  .react-paginate {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .react-paginate li {
    cursor: pointer;
    margin: 0 5px;
    padding: 3px 8px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    user-select: none;
  }

  .react-paginate li:hover {
    background-color: #007bff;
    color: #fff;
  }

  .react-paginate .active {
    background-color: #007bff;
    color: #fff;
  }

  .modal {
    position: fixed;
    z-index: 9999;
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
  }

  .botoesModal {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .subtitulo {
    font-weight: 500;
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

  .curso {
    margin-top: 15px;
    display: flex;
    width: 100%;
    gap: 10px;
  }

  .opcao {
    display: flex;
  }

  .opcaoTexto {
    margin-right: 15px;
  }

  .alinharRadio {
    display: flex;
    align-items: center;
    padding-right: 5px;
  }

  .reset {
    width: 100%;
    display: flex;
    margin-top: 15px;
  }

  .opcaoCurso {
    display: flex;
  }

  .botaoExcluir {
    width: 100%;
    display: flex;
  }

  @media (max-width: 800px) {
    font-size: 8px;

    .visibility {
      display: none;
    }
  }
`;

const TabelaWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  background: white;
  @media (max-width: 800px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Th = styled.div`
  padding: 10px;
  text-align: center;
  background-color: #cc0c1c;
  color: white;
  font-weight: bold;
`;

const Td = styled.div`
  padding: 8px;
  text-align: center;
  border-top: 1px solid #ddd;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 800px) {
    #botaoAdd {
      display: none;
    }
  }
`;

export const TabelaSessoes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [alunos, setAlunos]: any = useState([]);
  const [aluno, setAluno]: any = useState({});
  const [filtroAlunos, setFiltroAlunos] = useState("");
  const [alerta, setAlerta] = useState("");
  const [erro, setErro] = useState("");
  const perPage = 10;

  async function atualizaSessao() {
    try {
      setIsLoading(true);
      const response = await axios.put(`/sessao/${aluno.id}`, aluno);
      if (response.status === 200) {
        setAlerta(response.data.msg);
        const updatedAlunos = alunos.map((item: any) => {
          if (item.id === aluno.id) {
            return aluno;
          } else {
            return item;
          }
        });
        setAlunos(updatedAlunos);
        setFiltroAlunos("");
      }
    } catch (err: any) {
      if (err?.data?.msg) {
        setErro(err?.data?.msg);
      } else {
        setErro("Falha ao atualizar sessão!");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
      handleCloseModal();
    }
  }
  async function excluirSessao() {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/sessao/${aluno.id}`);
      if (response.status === 200) {
        setAlerta("Sessão excluída com sucesso!");
        const updatedAlunos = alunos.filter((item: any) => item.id !== aluno.id);
        setAlunos(updatedAlunos);
        setFiltroAlunos("");
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
      setErro("Falha ao excluir a sessão.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
      handleCloseModal();
    }
  }

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const handleOpenModal = (aluno: any) => {
    setAluno(aluno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen2Modal = (aluno: any) => {
    setAluno(aluno);
    setIsModal2Open(true);
  };

  const handleClose2Modal = (ev: any) => {
    setIsModal2Open(false);
    ev.preventDefault();
    reset();
  };

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    const cleanedInput = inputValue
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setFiltroAlunos(cleanedInput);
  };

  const filteredAlunos = [...alunos];

  const offset = currentPage * perPage;
  const paginatedData = filteredAlunos.slice(offset, offset + perPage);

  const projSchema = z.object({
    data: z.string().nonempty("O campo é obrigatório!"),
    hora: z.string().nonempty("O campo é obrigatório!"),
    TCC: z.string().nonempty("O campo é obrigatório!"),
    local: z.string().nonempty("O campo é obrigatório!"),
    // participantes: z.string().nonempty("O campo é obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(projSchema) });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const parts = data.data.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = `${day}/${month}/${year}`;

    try {
      const response = await axios.post("/sessao", {
        ...data,
        data: formattedDate,
      });

      if (response.status === 201) {
        setAlerta("Sessão adicionada!");
        const newSession = {
          id: response.data.id,
          data: formattedDate,
          hora: data.hora,
          local: data.local,
          TCC: data.TCC,
          maxProjetos: data.TCC === "1" ? 35 : 1,
        };
        setAlunos([...alunos, newSession]);
        reset();
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.msg) {
        setErro(err?.data?.msg);
      } else {
        setErro("Falha ao criar sessão!");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
      setIsModal2Open(false);
    }
  };

  useEffect(() => {
    async function getAlunos() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/sessao`);
        if (response.status === 200) {
          setAlunos(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getAlunos();
  }, []);

  return (
    <>
      {alerta && <Alerta texto={alerta} />}
      {erro && <AlertaFalha texto={erro} />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Inputs>
            <div id="botaoAdd">
              <Botao text="Adicionar Sessão +" onClick={handleOpen2Modal} />
            </div>
          </Inputs>
          <TabelaContainer>
            <TabelaWrapper>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Local</Th>
              <Th>TCC</Th>
              <Th>Vagas Disponíveis</Th>
              <Th className="visibility"></Th>
              {paginatedData.map((item, index) => (
                <React.Fragment key={index}>
                  <Td>{item.data}</Td>
                  <Td>{item.hora}</Td>
                  <Td> {item.local}</Td>
                  <Td>{item.TCC == 1 ? "TCCI" : "TCCII"}</Td>
                  <Td>{item.maxProjetos}</Td>
                  <Td
                    className="visibility"
                    onClick={() => handleOpenModal(item)}
                  >
                    <img
                      className="editar"
                      src="../../images/pencil.png"
                      style={{ width: "15px", cursor: "pointer" }}
                    />
                  </Td>
                </React.Fragment>
              ))}
            </TabelaWrapper>
            <PaginationContainer>
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                pageCount={Math.ceil(filteredAlunos.length / perPage)}
                onPageChange={handlePageClick}
                containerClassName={"react-paginate"}
                activeClassName={"active"}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                breakLabel={"..."}
                breakClassName={"break-me"}
              />
            </PaginationContainer>

            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <div className="subtitulo">
                    <span>Editar Sessão</span>
                  </div>
                  <div className="inputs">
                    <span>Data:</span>
                    <div className="inputArea">
                      <input
                        type="text"
                        value={aluno.data}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setAluno({
                            ...aluno,
                            data: selectedDate,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="inputs">
                    <span>Hora:</span>
                    <div className="inputArea">
                      <input
                        type="text"
                        value={aluno.hora}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setAluno({
                            ...aluno,
                            hora: selectedDate,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="curso">
                    <div className="tituloCurso">
                      <span>Disciplina:</span>
                    </div>
                    <div className="opcaoCurso">
                      <div className="alinharRadio">
                        <input
                          id="CC"
                          type="radio"
                          name="curso"
                          value="TCC1"
                          checked={aluno?.TCC == 1}
                          onClick={(e) =>
                            setAluno({
                              ...aluno,
                              TCC: "1",
                            })
                          }
                        />

                        <label htmlFor="CC" className="opcaoTexto">
                          TCC1
                        </label>
                      </div>

                      <div className="alinharRadio">
                        <input
                          id="SI"
                          type="radio"
                          name="curso"
                          value="TCC2"
                          checked={aluno?.TCC == 2}
                          onClick={(e) =>
                            setAluno({
                              ...aluno,
                              TCC: "2",
                            })
                          }
                        />{" "}
                        <label htmlFor="SI" className="opcaoTexto">
                          TCC2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="inputs">
                    <span>Local:</span>
                    <div className="inputArea">
                      <input
                        type="text"
                        defaultValue={aluno.local}
                        onChange={(e) =>
                          setAluno({
                            ...aluno,
                            local: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="inputs">
                    <span>Número máximo participantes:</span>
                    <div className="inputArea">
                      <input
                        type="text"
                        defaultValue={aluno.maxProjetos}
                        onChange={(e) =>
                          setAluno({
                            ...aluno,
                            maxProjetos: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="botaoExcluir">
                    <Botao text="Excluir sessão" onClick={excluirSessao} />
                  </div>

                  <div className="botoesModal">
                    <div>
                      <Botao text="Cancelar" onClick={handleCloseModal} />
                    </div>
                    <div>
                      <BotaoVerde text="Confirmar" onClick={atualizaSessao} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isModal2Open && (
              <div className="modal">
                <form
                  className="modal-content"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="subtitulo">
                    <span>Adicionar Sessão</span>
                  </div>
                  <div className="inputs">
                    <span>Data:</span>
                    <div className="inputArea">
                      <input type="date" {...register("data")} />
                    </div>
                    {errors.data && <ErroSpan message={errors.data.message} />}
                  </div>
                  <div className="inputs">
                    <span>Hora:</span>
                    <div className="inputArea">
                      <input type="text" {...register("hora")} />
                    </div>
                    {errors.hora && <ErroSpan message={errors.hora.message} />}
                  </div>
                  <div className="curso">
                    <div className="tituloCurso">
                      <span>Disciplina:</span>
                    </div>
                    <div className="opcaoCurso">
                      <div className="alinharRadio">
                        <input
                          id="CC"
                          type="radio"
                          name="curso"
                          value="1"
                          {...register("TCC")}
                        />
                        <label htmlFor="CC" className="opcaoTexto">
                          TCC1
                        </label>
                      </div>

                      <div className="alinharRadio">
                        <input
                          id="SI"
                          type="radio"
                          name="curso"
                          value="2"
                          {...register("TCC")}
                        />
                        <label htmlFor="SI" className="opcaoTexto">
                          TCC2
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.tcc && <ErroSpan message={"Selecione uma opção!"} />}
                  <div className="inputs">
                    <span>Local:</span>
                    <div className="inputArea">
                      <input type="text" {...register("local")} />
                    </div>
                    {errors.local && (
                      <ErroSpan message={errors.local.message} />
                    )}
                  </div>
                  <div className="botoesModal">
                    <div>
                      <Botao
                        text="Cancelar"
                        onClick={(ev: any) => handleClose2Modal(ev)}
                      />
                    </div>
                    <div>
                      <BotaoVerde text="Confirmar" />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </TabelaContainer>
        </>
      )}
    </>
  );
};
