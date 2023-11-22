import styled from "styled-components";

const DivEstilizada = styled.div`
  padding: 20px;
  border: 0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  width: 78%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: left;
  flex-direction: row;
  text-align: left;
  color: #000000;
  & > * {
    margin-bottom: 13px;
    margin-top: 13px;
  }
  img {
    border-radius: 50%;
    padding: 12px;
    height: 150px;
    width: 150px;
  }
`;

export const CardPerfil = ({ role }: any) => {
  return (
    <DivEstilizada>
      <div
        className="esquerda"
        style={{ display: "flex", justifyContent: "left" }}
      >
        {sessionStorage.getItem("usuario") === "32281374" ? (
          <img src="https://github.com/legolidia.png" alt="perfil" />
        ) : (
          <img src="./images/user.png" alt="perfil" />
        )}
      </div>
      <div
        className="direita"
        style={{
          width: "80%",
          display: "flex",
          textAlign: "left",
          flexDirection: "column",
          marginTop: "20px",
          padding: "0 0 0 20px",
        }}
      >
        <h3>{sessionStorage.getItem("nome")}</h3>
        <p>
          {" "}
          {role}: {sessionStorage.getItem("usuario")} <br /> <br />
          Papel: {sessionStorage.getItem("permissao")}
        </p>
      </div>
    </DivEstilizada>
  );
};
