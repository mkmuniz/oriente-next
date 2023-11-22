import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tipografia } from "@/components/Typography/Typography";
import Cookies from "js-cookie";
import React from "react";

const Home: any = styled.div`
  display: flex;
  z-index: 99;
  text-align: center;
  background: url("../images/fundoHome.png");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0px 4px 222px rgba(0, 0, 0, 0.25);
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  .header {
    width: 80%;
    border-bottom: 3px solid red;

    .texto {
      font-size: 50px;
    }

    .logout a {
      text-decoration: none;
      color: black;
      cursor: pointer;
    }
  }
  .divLogout {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      height: 18px;
    }

    @media (max-width: 650px) {
      position: absolute;
      right: 1px;
      top: 5px;
    }
  }

  .topContainer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
    width: 100%;

    flex-direction: row-reverse;
    text-align: right;

    a {
      text-decoration: none;
      color: black;
    }
    #logoutIcon {
      height: 20px;
    }
    #hamburguer {
      height: 30px;
      cursor: pointer;
      display: none;
      @media (max-width: 650px) {
        display: block;
        left: 1px;
        top: 5px;
        position: absolute;
      }
    }
  }
  .cardDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }

  .TextHome {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    text-align: left;
  }
  .TextHome p {
    font-size: 20px;
    margin: 0;
    color: #000000;
    opacity: 0.7;
  }

  @media (max-width: 650px) {
    .contentDiv {
      margin-left: 0;
    }
  }

  .item {
    color: ${(props: any) => props.theme.cores.branco};
  }
`;

const Menu: any = styled.div`
  background-color: ${(props: any) => props.theme.cores.primarias.a};
  width: 170px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const MenuDiv: any = styled.div`
  z-index: 2;
  height: 100%;
  position: fixed;

  @media (max-width: 650px) {
    left: ${(props: any) => props.left};
    transition: all 0.6s;
  }
`;

const ContentDiv: any = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  margin-left: 150px;

  @media (max-width: 650px) {
    margin-left: 0px;
  
`;

const Logo: any = styled.img`
  max-height: 40px;
  padding: 10px 0 10px 0;
`;

const Item: any = styled.div`
  width: 90%;
  height: auto;
  align-items: center;
  padding: 10px 0 10px 0;
  text-align: center;
  border-bottom: 1px solid ${(props: any) => props.theme.cores.branco};
  cursor: pointer;
  :hover {
    transition: 0.5s;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  }

  text-decoration: none;
  color: ${(props: any) => props.theme.cores.branco};
`;

export const HomeProf = ({ children }: any) => {
  const router = useRouter();
  const [menuPosition, setPosition] = useState("-100%");
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;

  function exitHandler() {
    sessionStorage.clear();
    if (Cookies) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }
    router.push("/");
  }

  return (
    <Home
      id="base"
      onClick={() => (menuPosition === "0%" ? setPosition("-100%") : "")}
    >
      <MenuDiv left={menuPosition}>
        <Menu>
          <div onClick={() => router.push("/homeProfessor")}>
            <Logo src="./images/image 1.png" alt="logo" />
          </div>

          <Item onClick={() => router.push("/homeProfessor")}>Home</Item>

          <Item onClick={() => router.push("/notificacoes")}>Notificações</Item>

          <Item onClick={() => router.push("/meusProjetos")}>Meus projetos</Item>

          <Item onClick={() => router.push("/avaliacoes")}>Minhas avaliações</Item>

          <Item onClick={() => router.push("/notas_prof")}>Notas</Item>

          <Item onClick={() => router.push("")}>Anteriores</Item>

          <Item onClick={() => router.push("/senha")}>Alterar Senha</Item>

          <Item>
            <div className="item" onClick={() => exitHandler()}>
              {" "}
              Sair{" "}
            </div>
          </Item>
        </Menu>
      </MenuDiv>
      <ContentDiv>
        <div className="header">
          <div className="topContainer">
            <div className="divLogout" onClick={() => exitHandler()}>
              <img src="./images/uil_exit.png" alt="logout" id="logoutIcon" />
              <span> sair </span>
            </div>
            <img
              src="./images/hamburguer.png"
              alt="hamburguer"
              id="hamburguer"
              onClick={() =>
                menuPosition === "-100%"
                  ? setPosition("0%")
                  : setPosition("-100%")
              }
            />
          </div>
          <div>
            <Tipografia componente="h1" variante="h1">
              <div className="texto">ORIENTE</div>
            </Tipografia>
          </div>
        </div>
        <div className="TextHome">
          <Tipografia variante="h3" componente="h3">
            Olá, {sessionStorage.getItem("nome")}
            <p>
              {Number(mes) > 7 ? "2º" : "1º"} semestre | {dataAtual}{" "}
            </p>
          </Tipografia>
        </div>
        <div className="cardDiv">{children}</div>
      </ContentDiv>
    </Home>
  );
};
