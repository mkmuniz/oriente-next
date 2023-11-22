import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeBase } from "@/components/Home/Home";
import { HomeProf } from "@/components/Home/HomeProf";
import { useContext, useState } from "react";
import { ProjContext } from "@/context/useContext";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { VerProjeto } from "@/components/Project/VerProjeto";
import Loader from "@/components/Loader/Loader";

function Projeto() {
  const { projId }: any = useContext(ProjContext);

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
            Projeto
          </div>
        </div>

        <>
          {" "}
          <VerProjeto idProjeto={projId} />
        </>
      </HomeProf>
    </ProvedorTema>
  );
}

export default Projeto;
