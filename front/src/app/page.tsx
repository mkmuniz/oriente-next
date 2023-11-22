"use client"

import { BaseLogin } from "@/components/BaseLogin/BaseLogin";
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import React from "react";
import { LoginForm } from "@/components/Forms/LoginForm";

export default function Home() {
  return (
    <ProvedorTema>
      <Estilos />
      <BaseLogin
        texto="BEM VINDO AO ORIENTE!!"
        botao="Enviar"
        tamanho="100vh"
        variante="body1"
        componente="h3"
        tipo="submit"
      >
        <LoginForm />
      </BaseLogin>
    </ProvedorTema>
  );
}
