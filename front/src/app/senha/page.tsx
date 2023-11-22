import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { HomeBase } from "@/components/Home/Home";
import { HomeProf } from "@/components/Home/HomeProf";
import { AlterarSenha } from "@/components/Password/Password";

function Home() {
  return (
    <ProvedorTema>
      <Estilos />
      {sessionStorage.getItem("permissao") === "professor" ? (
        <HomeProf>
          <AlterarSenha />
        </HomeProf>
      ) : (
        <HomeBase>
          <AlterarSenha />
        </HomeBase>
      )}
    </ProvedorTema>
  );
}

export default Home;
