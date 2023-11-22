"use client"

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Botao } from "../Button/Button";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputEstilizada = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.cores?.brancas};
  background-color: ${(props) => props.theme.cores?.secundarias.a};
  border: 0;
  border-radius: ${(props) => props.theme.espacamentos?.s};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 10px;

  @media (max-width: 1000px) {
    max-width: 100%;
  }

  ::placeholder {
    color: ${(props) => props.theme.cores?.neutras.a};
    font-family: ${(props) => props.theme.fontFamily};
    padding: 0 5px;
  }
`;

const Div = styled.div`
  padding: 0 0 10px 0;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justifycontent: center;
  align-items: center;
`;

const Overlay1: any = styled.div`
  position: absolute;
  border-radius: 8px;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props: any) => (props.visible ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s;
  backdrop-filter: blur(5px);
`;

const userformSchema = z.object({
  usuario: z
    .string()
    .nonempty("O campo é obrigatório!")
    .regex(/^[0-9]+$/, "Digite somente números!"),
  password: z.string().nonempty("O campo é obrigatório!"),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userformSchema),
  });

  async function authenticateUser(data: any) {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://172.16.39.72:3000/login",
        data,
        {
          timeout: 8000,
        }
      );
      const dados = response.data;
      console.log(response);
      if (response?.status === 200) {
        setErrMsg("");
        sessionStorage.setItem("usuario", dados.usuario);
        sessionStorage.setItem("permissao", dados.permissao);
        sessionStorage.setItem("nome", dados.nome);
        const [perm] = dados.permissoes;
        sessionStorage.setItem("cadastro_projeto", perm.cadastro_projeto);
        sessionStorage.setItem("sessao_poster", perm.sessao_poster);
        sessionStorage.setItem("TCCI", perm.indica_tcc1);
        sessionStorage.setItem("TCCII", perm.indica_tcc2);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        Cookies.set("access_token", accessToken);
        Cookies.set("refresh_token", refreshToken);
        if (dados.permissao === "aluno") {
          router.push("/home");
          return;
        }
        if (dados.permissao === "professor") {
          router.push("/homeProfessor");
          return;
        }
        if (dados.permissao === "coordenador") {
          router.push("/coordenador");
          return;
        }
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        const msg = err?.response?.data?.msg;
        setErrMsg(msg);
        setLoading(false);
        return;
      } else if (err.response) {
        const msg = err?.response?.data?.msg;
        setErrMsg(msg);
        return;
      } else {
        setLoading(false);
        setErrMsg("Falha ao conectar!");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(authenticateUser)}>
        <div style={{ width: "270px" }}>
          <InputEstilizada
            type="text"
            placeholder="TIA/DRT"
            {...register("usuario")}
          />
          {errors.usuario && <ErroSpan message={errors.usuario.message} />}
        </div>
        <div>
          <InputEstilizada
            type="password"
            placeholder="SENHA"
            {...register("password")}
          />
          {errors.password && <ErroSpan message={errors.password.message} />}
        </div>
        <Div>
          <Link href="/esqueciSenha" style={{ fontSize: "12px" }}>
            Esqueci minha senha
          </Link>
          <span style={{ color: "#cc0c1c", fontWeight: "bold" }}>{errMsg}</span>
          <Botao text="Enviar" tipo="button" />
        </Div>
      </Form>
      <Overlay1 $loading>
        <Loader />
      </Overlay1>
    </>
  );
};
