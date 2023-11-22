import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeCoord } from "@/components/Home/HomeCoord";
import { StickyHeadTable2 } from "@/components/Tables/Tabela2";

function TelaTabela2() {
  return (
    <ProvedorTema>
      <Estilos />
      <HomeCoord>
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "left",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "500",
              borderBottom: "3px solid red",
              textAlign: "left",
              width: "auto",
              padding: "0 7px 0 0",
              marginBottom: "10px",
            }}
          >
            Alunos
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
          }}
        >
          <StickyHeadTable2 />
        </div>
      </HomeCoord>
    </ProvedorTema>
  );
}

export default TelaTabela2;
