import styled from "styled-components";
import { Botao } from "@/components/Button/Button";
import { BotaoVerde } from "@/components/Button/GreenButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import axios from "../../utils/axiosConfig";
import Loader from "../Loader/Loader";
import React, { useState } from "react";
import { Alerta } from "@/components/Alerts/Alert";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import { Card } from "../Card/Card";

const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${(props: any) => props.theme.espacamentos.s};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  span {
    font-weight: 500;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .cabecalho {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }

  .cabecalho img {
    width: 80px;
  }
  .inputs {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .botoes {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .inputDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 650px) or (max-width: 850px) {
    width: 80%;

    input {
      width: 100%;
    }
  }
`;

const BotaoEnviar = styled.button`
  background-color: ${(props: any) => props.theme.cores.primarias.a};
  border-radius: 90px;
  font-weight: 400;
  font-size: 14px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 8px 25px;
  :hover {
    background-color: ${(props: any) => props.theme.cores.secundarias.b};
    transition: all 0.5s;
    transform: scale(1.1);
  }
  @media (max-width: 650px) {
    font-size: 14px;
  }
  font-family: ${(props: any) => props.theme.fontFamily};
`;

const Overlay1: any = styled.div`
  position: absolute;
  border-radius: 8px;
  top: 50%;
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
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

const InputEstilizada = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: ${(props: any) => props.theme.cores.brancas};
  background-color: ${(props: any) => props.theme.cores.secundarias.a};
  border: 0;
  border-radius: ${(props: any) => props.theme.espacamentos.s};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 10px;

  @media (max-width: 1000px) {
    max-width: 100%;
  }

  ::placeholder {
    color: ${(props: any) => props.theme.cores.neutras.a};
    font-family: ${(props: any) => props.theme.fontFamily};
    padding: 0 5px;
  }
  @media (max-width: 650px) or (max-width: 850px) {
    width: 80%;
  }
`;

const password_schema = z
  .object({
    new_password: z
      .string()
      .nonempty("Campo obrigatório!")
      .min(8, "Senha muito pequena min. 8!"),

    confirm_password: z.string().nonempty("Campo obrigatório!"),
    old_password: z.string().nonempty("Campo obrigatório!"),
  })
  .refine((data) => data.new_password !== data.old_password, {
    message: "Nova senha igual à senha anterior!",
    path: ["new_password"],
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não correspondem!",
    path: ["confirm_password"],
  });

export const AlterarSenha = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [visibility, setVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(password_schema) });

  async function updatePassword(data: any) {
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.put(
        `/user/${sessionStorage.getItem("usuario")}`,
        data
      );
      if (response && response.status === 200) {
        setVisibility(true);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err);
      if (!err.response) {
        return;
      } else {
        setErrMsg(err?.response?.data?.msg);
      }
      console.log(err.response.data.msg);
    } finally {
      setTimeout(() => setErrMsg(""), 3000);
      reset();
      setLoading(false);
    }
  }
  function cancelar(ev: any) {
    ev.preventDefault();
    reset();
  }

  return (
    <>
      {!visibility ? (
        <>
          {errMsg && <AlertaFalha texto={errMsg} />}
          <Card>
            <Container>
              <div className="cabecalho">
                <img src="./images/image 2.png" alt="logo" />
                <span>Redefina sua senha abaixo.</span>
              </div>

              <form onSubmit={handleSubmit(updatePassword)}>
                <div className="inputs">
                  <div className="inputDiv">
                    <InputEstilizada
                      placeholder="Senha atual"
                      type="password"
                      {...register("old_password")}
                    />
                    {errors.old_password && (
                      <ErroSpan message={errors.old_password.message} />
                    )}
                  </div>

                  <div className="inputDiv">
                    <InputEstilizada
                      placeholder="Nova senha"
                      type="password"
                      {...register("new_password")}
                    />
                    {errors.new_password && (
                      <ErroSpan message={errors.new_password.message} />
                    )}
                  </div>
                  <div className="inputDiv">
                    <InputEstilizada
                      placeholder="Confirme a senha"
                      type="password"
                      {...register("confirm_password")}
                    />
                    {errors.confirm_password && (
                      <ErroSpan message={errors.confirm_password.message} />
                    )}
                  </div>
                </div>
                <div className="botoes">
                  <BotaoEnviar type="button" onClick={(ev: any) => cancelar(ev)}>
                    Cancelar
                  </BotaoEnviar>
                  <BotaoVerde text="Confirmar" />
                </div>
              </form>
              <Overlay1 $loading>
                <Loader />
              </Overlay1>
            </Container>
          </Card>
        </>
      ) : (
        <>{<Alerta texto={"Senha redefinida com sucesso!"} />}</>
      )}
    </>
  );
};
