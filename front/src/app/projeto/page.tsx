import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeBase } from "@/components/Home/Home";
import { FormProjeto } from "@/components/Project/CriaProjetoForm";
import { DescricaoProjeto } from "@/components/Project/DescricaoProjeto";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import axios from "@/utils/axiosConfig";

function Projeto() {
  const [idProjeto, setProjeto] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [visibility2, setVisibility2] = useState(true);

  const atualizaVisibilidade = (novoEstado: any, idProjeto: any) => {
    setProjeto(idProjeto);
    setVisibility(novoEstado);
  };

  useEffect(() => {
    async function temProjeto() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/aluno/find`);
        if (res.status === 200) {
          sessionStorage.setItem(
            "cadastro_projeto",
            res?.data?.permissoes[0]?.cadastro_projeto
          );
        }
        if (res.status === 200 && res?.data?.aluno?.idProjeto) {
          setVisibility(false);
          setProjeto(res?.data?.aluno?.idProjeto);
          return;
        } else if (sessionStorage.getItem("cadastro_projeto") === "true") {
          setVisibility(true);
          return;
        } else {
          setVisibility2(false);
          return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    temProjeto();
  }, []);

  return (
    <ProvedorTema>
      <Estilos />
      <HomeBase>
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
        {visibility2 ? (
          <>
            {isLoading ? (
              <Loader />
            ) : visibility ? (
              <FormProjeto atualizarEstadoDaTela={atualizaVisibilidade} />
            ) : (
              <DescricaoProjeto idProjeto={idProjeto} />
            )}
          </>
        ) : (
          <h3>Cadastro de novos projetos indisponível no momento!</h3>
        )}
      </HomeBase>
    </ProvedorTema>
  );
}

export default Projeto;
