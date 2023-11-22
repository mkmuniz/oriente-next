import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Botao } from "@/components/Button/Button";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "../../utils/axiosConfig";
import { AlertaFalha } from "@/components/Alerts/FailAlert";
import Loader from "../Loader/Loader";
import { useState } from "react";

const InputEstilizada = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.cores.brancas};
  background-color: ${(props) => props.theme.cores.secundarias.a};
  border: 0;
  border-radius: ${(props) => props.theme.espacamentos.s};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 10px;

  @media (max-width: 1000px) {
    max-width: 100%;
  }

  ::placeholder {
    color: ${(props) => props.theme.cores.neutras.a};
    font-family: ${(props) => props.theme.fontFamily};
    padding: 0 5px;
  }
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
  transition: visibility 0s, opacity 0.3s;
  backdrop-filter: blur(5px);
`;

const Form = styled.form`
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-itens: center;
`;

const drt_tiaSchema = z.object({
  drt_tia: z
    .string()
    .nonempty("O campo é obrigatório!")
    .regex(/^[0-9]+$/, "Utilize somente números!"),
});

export const DrtForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(drt_tiaSchema) });
  const [loading, setIsLoading] = useState(false);

  async function requestNewPassword(data: any) {
    console.log(data);
    const usuario = data.drt_tia;
    try {
      setIsLoading(true);
      await axios.put(`/recover/${usuario}`);
    } catch (err) {
      console.log(err);
      return (
        <AlertaFalha
          message={"Não foi possível redefinir a senha, tente novamente!"}
        />
      );
    } finally {
      setIsLoading(false);
      router.push("/confirmacaoLink");
    }
  }

  return (
    <Form onSubmit={handleSubmit(requestNewPassword)}>
      <div>
        <InputEstilizada
          type="text"
          placeholder="TIA/DRT"
          {...register("drt_tia")}
        />
        {errors.drt_tia && <ErroSpan message={errors.drt_tia.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          {" "}
          <Botao text="Cancelar" />{" "}
        </Link>
        <Botao text={"Confirmar"} />
        <Overlay1 $loading>
          <Loader />
        </Overlay1>
      </div>
    </Form>
  );
};
