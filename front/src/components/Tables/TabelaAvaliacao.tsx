import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

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

  .botoes {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
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

  @media (max-width: 800px) {
    font-size: 11px;

    .visibility {
      display: none;
    }

    .botoes {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 10px;
    }
  }
`;

const TabelaWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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

export const TabelaAvaliacao = ({ projeto, handleClick, sessao }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sessoes, setSessoes]: any = useState();
  const [projetos, setProjetos] = useState(projeto);
  const perPage = 10;

  useEffect(() => {
    setProjetos(projeto);
    setSessoes(sessao);
  }, [projeto, sessao]);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const paginatedData = projetos
    ? projetos.slice(offset, offset + perPage)
    : [];

  return (
    <>
      <>
        <TabelaContainer>
          <TabelaWrapper>
            <Th>Titulo</Th>
            <Th>Disciplina</Th>
            <Th>Curso</Th>
            <Th>Data</Th>
            <Th></Th>

            {paginatedData.map((item: any, index: any) => (
              <React.Fragment key={index}>
                <Td>{item.titulo}</Td>
                <Td>{item.disciplina}</Td>
                <Td> {item.curso}</Td>
                <Td>
                  {sessoes &&
                  sessoes.find((element: any) => element.id === item.idSessao)
                    ? sessoes.find((element: any) => element.id === item.idSessao)
                        .data
                    : ""}{" "}
                  {sessoes &&
                  sessoes.find((element: any) => element.id === item.idSessao)
                    ? sessoes.find((element: any) => element.id === item.idSessao)
                        .hora
                    : ""}{" "}
                  {sessoes &&
                  sessoes.find((element: any) => element.id === item.idSessao)
                    ? sessoes.find((element: any) => element.id === item.idSessao)
                        .local
                    : ""}
                </Td>
                <Td onClick={() => handleClick(item)}>
                  <img
                    className="editar"
                    src="../../images/viewMore.png"
                    style={{ width: "18px", cursor: "pointer" }}
                  />
                </Td>
              </React.Fragment>
            ))}
          </TabelaWrapper>
          <PaginationContainer>
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Próximo"}
              pageCount={Math.ceil(projetos ? projetos.length : 0 / perPage)}
              onPageChange={handlePageClick}
              containerClassName={"react-paginate"}
              activeClassName={"active"}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              breakLabel={"..."}
              breakClassName={"break-me"}
            />
          </PaginationContainer>
        </TabelaContainer>
      </>
    </>
  );
};
