import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { CronogramaOrientacao } from "@/components/Forms/CronogramaOrientacao";
import { HomeProf } from "@/components/Home/HomeProf";

function TelaCronograma() {
  return (
    <ProvedorTema>
      <Estilos />
      <HomeProf>
        <CronogramaOrientacao />
      </HomeProf>
    </ProvedorTema>
  );
}

export default TelaCronograma;
