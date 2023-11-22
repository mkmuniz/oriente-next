"use client"

import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeCoord } from "@/components/Home/HomeCoord";
import { CardSemestre } from "@/components/Card/CardSemestreController";

function Home() {
  return (
    <ProvedorTema>
      <Estilos />
      <HomeCoord>
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
            Autorizações
          </div>
        </div>
        <CardSemestre />
      </HomeCoord>
    </ProvedorTema>
  );
}

export default Home;
