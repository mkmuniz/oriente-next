"use client"

import { BaseLogin } from "@/components/BaseLogin/BaseLogin";
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { DrtForm } from "@/components/Forms/DrtForm";

function SolicitacaoSenha() {

  return (
    <ProvedorTema>
      <Estilos />
      <BaseLogin
        texto="Digite seu TIA ou DRT."
        tamanho="90vh"
        variante="body1"
        componente="h2"
      >
        <DrtForm />
      </BaseLogin>
    </ProvedorTema>
  );
}

export default SolicitacaoSenha;
