import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "@/utils/axiosConfig";
import Loader from "@/components/Loader/Loader";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { Overlay } from "@/components/Overlay/Overlay";
import { Alerta } from "@/components/Alerts/Alert";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import Error from "next/error";

const DivSemestre = styled.div`
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
  text-align: left;

  .titulo {
    font-size: 24px;
    font-weight: 500;
    border-bottom: 3px solid red;
    text-align: center;
    width: auto;
    padding: 12px 0 0 0;
  }

  .semestre {
    display: flex;
    justify-content: left;
    width: 100%;
    padding: 0px 0 0px 40px;
    font-size: 13px;
  }

  .controles {
    width: 95%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .itens {
    border: 1px solid black;
    border-radius: 10px;
    width: 99%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    justify-content: space-between;
  }

  .radio {
    display: flex;
    gap: 10px;
    height: 100%;
  }

  .radiozinho {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 0px 10px 0 0px;
  }

  .botoes {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .botao {
    width: 100%;
    display: flex;
    justify-content: right;
    padding: 0 20px 0 0;
  }
  .botaoEncerrar {
    width: 100%;
    display: none;
    padding: 0 0px 0px 20px;
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
    border-radius: 5px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
    max-width: 80%;
    width: 68%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .botoesModal {
    display: flex;
    justify-content: space-between;
  }

  .headerModal {
    display: flex;
  }

  .headerModal img {
    height: 30px;
  }

  .alinharTexto {
    display: flex;
    align-items: center;
    color: #cc0c1c;
  }

  .labelFile {
    cursor: pointer;
    border: 1px solid black;
    background-color: #c1c1c1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
  }

  .inputFile {
    display: none;
  }

  #iconUpload {
    height: 30px;
    width: 30px;
  }

  .aaa {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 650px) {
    width: 90%;

    .titulo {
      font-size: 20px;
      font-weight: 600;
    }
    .botao {
      justify-content: center;
      padding: 0;
    }
    .itens {
      font-size: 14px;
      width: 97%;
    }
    .radiozinho {
      font-size: 10px;
    }
    .modal-content {
      margin-left: 0;
    }
  }
`;

export const CardSemestre = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [permissoes, setPermissoes]: any = useState({});
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = async (event: { target: { files: any[]; }; }) => {
    let arquivo = event.target.files[0];
    setFile(event.target.files[0]);

    if (event.target.files[0]) {
      setSelectedFileName(arquivo.name);
    }
  };
  async function loadAlunos() {
    setIsLoading(true);
    try {
      if (!file) {
        console.log("sem arquivo");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/upload/alunos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response && response.status === 201) {
        handleCloseModal();
        setMsg("Alunos carregados com sucesso!");
        setIsLoading(false);
        console.log(response?.data?.msg);
      }

      console.log("Upload successful:", response.data);
    } catch (error: any) {
      setErrMsg("Falha ao carregar alunos!");
      console.error("Error uploading file:", error);
      console.log(error?.response?.data);
    } finally {
      setTimeout(() => setMsg(""), 3000);
      setTimeout(() => setErrMsg(""), 3000);
      setIsLoading(false);
      handleCloseModal();
    }
  }
  async function updatePermissoes() {
    try {
      setIsLoading(true);
      const response = await axios.put("/permissoes", permissoes);
      if (response.status === 200) {
        setMsg("Permissões atualizadas!");
      }
    } catch (err) {
      setErrMsg("Falha atualizar permissões!");
      console.log(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMsg(""), 3000);
      setTimeout(() => setErrMsg(""), 3000);
    }
  }
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get("/permissoes");
        if (response.status === 200) {
          setPermissoes(response.data[0]);
          console.log(response.data[0].cadastro_projeto);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {msg && <Alerta texto={msg} />}
      {errMsg && <AlertaFalha texto={errMsg} />}
      <DivSemestre>
        <div className="titulo">Controle do Semestre</div>

        <div>
          <Botao text="Iniciar Semestre" onClick={handleOpenModal} />
        </div>

        <div className="controles">
          <div className="itens">
            Habilitar seleção data e hora da sessão
            <div className="radio">
              <div className="radiozinho">
                SIM
                <input
                  type="radio"
                  name="radio"
                  value="true"
                  checked={permissoes.sessao_poster}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      sessao_poster: true,
                    })
                  }
                />
              </div>
              <div className="radiozinho">
                NÃO
                <input
                  type="radio"
                  name="radio"
                  value="false"
                  checked={!permissoes.sessao_poster}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      sessao_poster: false,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="itens">
            Habilitar cadastro e aceitação de projetos
            <div className="radio">
              <div className="radiozinho">
                SIM
                <input
                  type="radio"
                  name="radio2"
                  checked={permissoes.cadastro_projeto}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      cadastro_projeto: true,
                    })
                  }
                />
              </div>
              <div className="radiozinho">
                NÃO
                <input
                  type="radio"
                  name="radio2"
                  checked={!permissoes.cadastro_projeto}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      cadastro_projeto: false,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="itens">
            Habilitar indicação de avaliadores e suplente TCC1
            <div className="radio">
              <div className="radiozinho">
                SIM
                <input
                  type="radio"
                  name="radio3"
                  checked={permissoes.indica_tcc1}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      indica_tcc1: true,
                    })
                  }
                />
              </div>
              <div className="radiozinho">
                NÃO
                <input
                  type="radio"
                  name="radio3"
                  checked={!permissoes.indica_tcc1}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      indica_tcc1: false,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="itens">
            Habilitar indicação de avaliadores e suplente TCC2
            <div className="radio">
              <div className="radiozinho">
                SIM
                <input
                  type="radio"
                  name="radio4"
                  checked={permissoes.indica_tcc2}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      indica_tcc2: true,
                    })
                  }
                />
              </div>
              <div className="radiozinho">
                NÃO
                <input
                  type="radio"
                  name="radio4"
                  checked={!permissoes.indica_tcc2}
                  onClick={(e) =>
                    setPermissoes({
                      ...permissoes,
                      indica_tcc2: false,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="semestre">Semestre iniciado em: 01/01/2021</div>
        <div className="botoes">
          <div className="botaoEncerrar">
            <Botao text="Encerrar semestre" />
          </div>
          <div className="botao">
            <Botao text="Salvar alterações" onClick={updatePermissoes} />
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="headerModal">
                <img src="../images/files.png" />
                <div className="alinharTexto">
                  <span>Arquivo</span>
                </div>
              </div>
              <label className="labelFile">
                <input
                  type="file"
                  name="file"
                  className="inputFile"
                  onChange={() => handleFileChange}
                />
                {selectedFileName ? (
                  <span>{selectedFileName}</span>
                ) : (
                  <div className="aaa">
                    <img src="../images/uploadoFile.png" id="iconUpload" />
                    <span>Coloque um arquivo .csv aqui</span>
                  </div>
                )}
              </label>

              <div className="botoesModal">
                <div>
                  <Botao text="Cancelar" onClick={handleCloseModal} />
                </div>
                <div>
                  <BotaoVerde text="Confirmar" onClick={() => loadAlunos()} />
                </div>
              </div>
            </div>
          </div>
        )}
        <Overlay visible={isLoading}>
          <Loader />
        </Overlay>
      </DivSemestre>
    </>
  );
};
