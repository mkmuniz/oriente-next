"use client"

import { BaseLogin } from "@/components/BaseLogin/BaseLogin"
import { ProvedorTema } from "@/components/ThemeProvider/ThemeProvider";
import { Estilos } from "@/components/GlobalStyles/GlobalStyles";
import { Botao } from "@/components/Button/Button";
import Link from "next/link";

function LinkSenha() {
  return (
    <ProvedorTema>
      <Estilos />
      <BaseLogin texto="Link enviado para e-mail cadastrado." botao="Home" tamanho="60vh" variante="body1" componente="h3">
        <Link href="/" > <Botao text="Home" /> </Link>
      </BaseLogin>
    </ProvedorTema>
  );
}

export default LinkSenha;
