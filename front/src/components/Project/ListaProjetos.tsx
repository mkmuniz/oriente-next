import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import Loader from "@/components/Loader/Loader";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  width: 80%;
  display: flex;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  margin-top: 10px;
  padding: 10px;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

  .lista{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  .titulo {
    display: flex;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    justify-content: left;

    #projeto{
      width: 37%;
      text-align: center;
      justify-content: center;
    }
    #alunos{
      width: 33%;
      text-align: center;
      justify-content: center;
    }
    #disciplina{
      width: 18%;
      text-align: center;
      justify-content: center;
    }
    #turma{
      width: 5%;
      text-align: center;
      justify-content: center;
    }

  }

  #principal{
    border: 1px solid #CC0C1C;
    border-radius: 10px;
  }

  .conteudoLista{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 3px 1px;
    width: 100%;    
  }

  #projeto{
    width: 39%;
  }

  #alunos{
    width: 37%;
  }

  #disciplina{
    width: 13%;
  }

  #turma{
    width: 10%;
  }

  .fechar{
    width: 5%;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-left: 10px;
    padding: 0px 0px 0px 10px;
    img{
      cursor: pointer;
    }
    :hover{
      saturate(0%);
      transition: all 0.5s;
    }
    
  }

  .verMais{
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      cursor: pointer;
    }
  }


  @media (max-width: 650px) {

    width:93%;
    padding: 5px;

    .lista {
      padding: 2px 5px;
      width: 100%;
    }
      #projeto{
        width: 35%;
      }

      #alunos{
        width: 31%;
      }

      #disciplina{
        width: 17%;
      }

      #turma{
        width: 17%;
      }
    
    span {
      font-size: 10px;
    }

    .titulo{
      #alunos{    
        width: 25%; 
      }
      #turma{
        width:15%;
      }
    }
    .verMais{
      padding: 2px;
      img{
        height: 18px;
      }
    }
  }

`;

export const ListaProjetos = ({ mudaVisibilidade }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projetos, setProjetos] = useState([]);

  function abreProjeto(idProjeto: any) {
    mudaVisibilidade(true, idProjeto);
  }
  useEffect(() => {
    setIsLoading(true);

    async function getProjetos() {
      try {
        if (sessionStorage.getItem("permissao") === "professor") {
          const proj = await axios.get(`/professor/projetos/orientador`);
          setProjetos(proj.data);
        }
        if (sessionStorage.getItem("permissao") === "coordenador") {
          const proj = await axios.get(`/projeto`);
          setProjetos(proj.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getProjetos();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          {projetos.length > 0 ? (
            <Card>
              <div className="lista">
                <div className="titulo">
                  <div className="titulo" id="projeto">
                    <span>Título</span>
                  </div>

                  <div className="titulo" id="alunos">
                    <span>Aluno(s)</span>
                  </div>

                  <div className="titulo" id="disciplina">
                    <span>Disciplina</span>
                  </div>

                  <div className="titulo" id="turma">
                    <span>Turma</span>
                  </div>
                </div>

                {projetos.map((elem: any, index) => {
                  return (
                    <div className="conteudoLista" id="principal" key={index}>
                      <div className="conteudoLista" id="projeto">
                        <span> {elem.titulo} </span>
                      </div>

                      <div className="conteudoLista" id="alunos">
                        <span>{elem.nomeAlunos}</span>
                      </div>

                      <div className="conteudoLista" id="disciplina">
                        <span>{elem.disciplina}</span>
                      </div>

                      <div className="conteudoLista" id="turma">
                        <span>{elem.turma}</span>
                      </div>

                      <div className="verMais">
                        <img
                          src="../../images/viewMore.png"
                          height="20px"
                          onClick={() => abreProjeto(elem.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <h3>Você não possui nenhum projeto como orientador!</h3>
          )}
        </Container>
      )}
    </>
  );
};
