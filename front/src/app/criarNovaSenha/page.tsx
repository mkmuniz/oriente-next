"use client"

import { BaseLogin } from "@/components/BaseLogin/BaseLogin";
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { CreatePassword } from "@/components/Forms/CreatePasswdForm";

function CriarSenha() {
  return (
    <ProvedorTema>
      <Estilos />
      <BaseLogin
        texto="Digite sua nova senha abaixo e confirme"
        botao="Confirmar"
        tamanho="80vh"
        variante="body1"
        componente="h3"
      >
        <CreatePassword />
      </BaseLogin>
    </ProvedorTema>
  );
}

export default CriarSenha;
