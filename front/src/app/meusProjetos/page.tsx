import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeProf } from "@/components/Home/HomeProf";
import { DescricaoProjeto } from "@/components/Project/DescricaoProjeto";
import { useState } from "react";
import { TabelaProjetos } from "@/components/Tables/TabelaProjetos";

function Projetos() {
  const [visibilidade, setVisibilidade] = useState(false);
  const [projId, setProjId] = useState("");

  function mudaVisibilidade(visibilidade: any, idProj: any) {
    setVisibilidade(visibilidade);
    setProjId(idProj);
  }

  return (
    <ProvedorTema>
      <Estilos />
      <HomeProf>
        <div style={{ display: "flex", width: "80%", justifyContent: "left" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "left",
              width: "100%",
              padding: "0 7px 0 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ borderBottom: "3px solid red" }}>
              {visibilidade ? "Projeto" : "Projetos"}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {visibilidade ? (
            <DescricaoProjeto
              idProjeto={projId}
              mudaVisibilidade={mudaVisibilidade}
              openedFromList={visibilidade}
            />
          ) : (
            <TabelaProjetos mudaVisibilidade={mudaVisibilidade} />
          )}
        </div>
      </HomeProf>
    </ProvedorTema>
  );
}

export default Projetos;
