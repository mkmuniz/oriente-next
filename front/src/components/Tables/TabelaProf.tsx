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

  .botoes {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
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

  @media (max-width: 800px) {
    font-size: 8px;

    .visibility {
      display: none;
    }
  }
`;

const TabelaWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  background: white;
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
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
  justify-content: space-between;
  width: 100%;

  input {
    border-radius: 12px;
    box-sizing: border-box;
    border: 1px solid black;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 10px;
    height: 20px;
    width: 100%;
    height: 37px;
  }

  .areaBusca {
    width: 50%;
  }

  @media (max-width: 800px) {
    #botaoAdd {
      display: none;
    }
  }
`;

export const TabelaProf = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [alunos, setAlunos]: any = useState([]);
  const [professor, setProfessor]: any = useState({});
  const [filtroAlunos, setFiltroAlunos] = useState("");
  const [alerta, setAlerta] = useState("");
  const [erro, setErro] = useState("");
  const perPage = 10;

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const handleOpenModal = (aluno: any) => {
    setProfessor(aluno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen2Modal = (aluno: any) => {
    setProfessor(aluno);
    setIsModal2Open(true);
  };

  const handleClose2Modal = () => {
    setIsModal2Open(false);
    reset();
  };

  const handleOpenModal3 = (prof: any) => {
    setIsModalOpen3(true);
    setProfessor(prof);
  };

  async function excluirProfessor() {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/professor/${professor.drt}`);
      if (response.status === 200) {
        const filter = alunos.filter((elem: any) => elem.drt !== professor.drt);
        setAlunos(filter);
        setFiltroAlunos("");
        setAlerta("Professor excluido com sucesso!");
        setIsModalOpen3(false);
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setErro("Professor não encontrado");
        return;
      }
      console.log(err);
      setErro("Falha ao excluir professor!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
      setIsModalOpen3(false);
    }
  }

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    const cleanedInput = inputValue
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setFiltroAlunos(cleanedInput);
  };

  const filteredAlunos = [...alunos]
    .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
    .filter((item: any) => {
      return (
        item.nome.toLowerCase().includes(filtroAlunos.toLowerCase()) ||
        item.drt.toLowerCase().includes(filtroAlunos.toLowerCase())
      );
    });

  const offset = currentPage * perPage;
  const paginatedData = filteredAlunos.slice(offset, offset + perPage);

  useEffect(() => {
    async function getAlunos() {
      setIsLoading(true);

      try {
        const response = await axios.get(`/professor`);
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

  async function updateProfessor() {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/professor/${professor.drt}`,
        professor
      );
      if (response.status === 200) {
        setAlerta(response.data.msg);
        const updatedAlunos: any = alunos.map((item: any) => {
          return item.drt === professor.drt ? professor : item;
        });
        setAlunos(updatedAlunos);
        setFiltroAlunos("");
      }
    } catch (err: any) {
      if (err?.data?.msg) {
        setErro(err?.data?.msg);
      } else {
        setErro("Falha ao atualizar professor!");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
      handleCloseModal();
    }
  }

  async function resetarSenha() {
    setIsLoading(true);
    try {
      const response = await axios.put(`/usuario/reset/${professor.drt}`);
      if (response.status === 200) {
        setAlerta(response.data.msg);
        setFiltroAlunos("");
      }
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data?.msg) {
        setErro(err?.response?.data?.msg);
      } else {
        setErro("Falha ao resetar senha!");
      }
    } finally {
      setIsLoading(false);
      handleCloseModal();
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
    }
  }

  const projSchema = z.object({
    nome: z.string().nonempty("O campo é obrigatório!"),
    usuario: z
      .string()
      .nonempty("O campo é obrigatório!")
      .regex(/^[0-9]+$/, "Digite somente números!"),
    cargo: z.string().nonempty("O campo é obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(projSchema) });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    data.nome = data.nome.toUpperCase();

    try {
      const response = await axios.post("/professor", {
        nome: data.nome,
        usuario: data.usuario,
        cargo: data.cargo,
        permissao: data.cargo === "coordenador" ? "coordenador" : "professor",
      });
      if (response.status === 201) {
        setAlerta("Professor criado com sucesso!");
        setAlunos([...alunos, response.data]);
      }
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data?.msg) {
        setErro(err?.response?.data?.msg);
      } else {
        setErro("Falha ao criar aluno!");
      }
    } finally {
      setIsLoading(false);
      setIsModal2Open(false);
      setTimeout(() => setAlerta(""), 3000);
      setTimeout(() => setErro(""), 3000);
    }
  };

  return (
    <>
      {alerta && <Alerta texto={alerta} />}
      {erro && <AlertaFalha texto={erro} />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Inputs>
            <div className="areaBusca">
              <input
                type="text"
                placeholder="Digite o nome ou DRT do professor"
                onChange={(ev) => handleInputChange(ev)}
              />
            </div>
            <div id="botaoAdd">
              <Botao text="Adicionar professor +" onClick={handleOpen2Modal} />
            </div>
          </Inputs>
          <TabelaContainer>
            <TabelaWrapper>
              <Th>Nome</Th>
              <Th>DRT</Th>
              <Th>Cargo</Th>
              <Th className="visibility"></Th>
              <Th className="visibility"></Th>
              {paginatedData.map((item, index) => (
                <React.Fragment key={index}>
                  <Td>{item.nome}</Td>
                  <Td>{item.drt}</Td>
                  <Td> {item.cargo}</Td>
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
                  <Td
                    className="visibility"
                    onClick={() => handleOpenModal3(item)}
                  >
                    <img
                      className="editar"
                      src="../../images/trash-bin.png"
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
                    <span>Editar professor</span>
                  </div>
                  <div className="inputs">
                    <span>Nome:</span>
                    <div className="inputArea">
                      <input
                        type="text"
                        defaultValue={professor.nome}
                        onChange={(e) =>
                          setProfessor({
                            ...professor,
                            nome: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="curso">
                    <div className="tituloCurso">
                      <span>Cargo:</span>
                    </div>
                    <div className="opcaoCurso">
                      <div className="alinharRadio">
                        <input
                          id="PPI"
                          type="radio"
                          name="cargo"
                          value="PPI"
                          checked={professor?.cargo === "PPI"}
                          onClick={(e) =>
                            setProfessor({
                              ...professor,
                              cargo: "PPI",
                            })
                          }
                        />
                        <label htmlFor="PPI" className="opcaoTexto">
                          PPI
                        </label>
                      </div>
                      <div className="alinharRadio">
                        <input
                          id="PPP"
                          type="radio"
                          name="cargo"
                          value="PPP"
                          checked={professor.cargo === "PPP"}
                          onClick={(e: any) =>
                            setProfessor({
                              ...professor,
                              cargo: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="PPP" className="opcaoTexto">
                          PPP
                        </label>
                      </div>
                      <div className="alinharRadio">
                        <input
                          id="PPA"
                          type="radio"
                          name="cargo"
                          value="PPA"
                          checked={professor.cargo === "PPA"}
                          onClick={(e: any) =>
                            setProfessor({
                              ...professor,
                              cargo: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="PPA" className="opcaoTexto">
                          PPA
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="reset">
                    <Botao text="Resetar senha" onClick={resetarSenha} />
                  </div>
                  <div className="botoesModal">
                    <div>
                      <Botao text="Cancelar" onClick={handleCloseModal} />
                    </div>
                    <div>
                      <BotaoVerde text="Confirmar" onClick={updateProfessor} />
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
                    <span>Adicionar professor</span>
                  </div>
                  <div className="inputs">
                    <span>Nome:</span>
                    <div className="inputArea">
                      <input type="text" {...register("nome")} />
                    </div>
                    {errors.nome && <ErroSpan message={errors.nome.message} />}
                  </div>
                  <div className="inputs">
                    <span>DRT:</span>
                    <div className="inputArea">
                      <input type="text" {...register("usuario")} />
                    </div>
                    {errors.usuario && (
                      <ErroSpan message={errors.usuario.message} />
                    )}
                  </div>
                  <div className="curso">
                    <div className="tituloCurso">
                      <span>Cargo:</span>
                    </div>
                    <div className="opcaoCurso">
                      <div className="alinharRadio">
                        <input
                          id="PPI"
                          type="radio"
                          name="cargo"
                          value="PPI"
                          {...register("cargo")}
                        />
                        <label htmlFor="PPI" className="opcaoTexto">
                          PPI
                        </label>
                      </div>

                      <div className="alinharRadio">
                        <input
                          id="PPP"
                          type="radio"
                          name="cargo"
                          value="PPP"
                          {...register("cargo")}
                        />
                        <label htmlFor="PPP" className="opcaoTexto">
                          PPP
                        </label>
                      </div>

                      <div className="alinharRadio">
                        <input
                          id="PPA"
                          type="radio"
                          name="cargo"
                          value="PPA"
                          {...register("cargo")}
                        />
                        <label htmlFor="PPA" className="opcaoTexto">
                          PPA
                        </label>
                      </div>
                      <div className="alinharRadio">
                        <input
                          id="coordenador"
                          type="radio"
                          name="cargo"
                          value="coordenador"
                          {...register("cargo")}
                        />
                        <label htmlFor="coordenador" className="opcaoTexto">
                          Coordenador
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.nome && <ErroSpan message={"Selecione uma opção!"} />}

                  <div className="botoesModal">
                    <div>
                      <Botao text="Cancelar" onClick={handleClose2Modal} />
                    </div>
                    <div>
                      <BotaoVerde text="Confirmar" />
                    </div>
                  </div>
                </form>
              </div>
            )}
            {isModalOpen3 && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Excluir Professor</h3>
                  <h4>{`Tem certeza que você quer excluir o professor(a) ${professor.nome}?`}</h4>
                  <div className="botoes">
                    <Botao
                      text="Cancelar"
                      onClick={() => setIsModalOpen3(false)}
                    />
                    <BotaoVerde
                      text="Salvar"
                      onClick={() => excluirProfessor()}
                    />
                  </div>
                </div>
              </div>
            )}
          </TabelaContainer>
        </>
      )}
    </>
  );
};
