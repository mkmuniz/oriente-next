import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Botao } from "@/components/Button/Button";
import { ErroSpan } from "../ErroSpan/ErroSpan";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

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
`;

const Form = styled.form`
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const password_schema = z
  .object({
    new_password: z
      .string()
      .nonempty("Campo obrigatório!")
      .min(8, "Senha muito pequena!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Senha não atende aos requisitos!"
      ),

    confirm_password: z.string().nonempty("Campo obrigatório!"),
  })
  .refine((data: any) => data.new_password === data.confirm_password, {
    message: "As senha não correspondem !",
    path: ["confirm_password"],
  });

export const CreatePassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(password_schema) });

  function savePassword(data: any) {
    console.log(data);
    router.push("/senhaAlterada");
  }

  return (
    <Form onSubmit={handleSubmit(savePassword)}>
      <div>
        <InputEstilizada
          type="password"
          placeholder="NOVA SENHA"
          {...register("new_password")}
        />
        {errors.new_password && (
          <ErroSpan message={errors.new_password.message} />
        )}
      </div>
      <div>
        <InputEstilizada
          type="password"
          placeholder="CONFIRMAR SENHA"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <ErroSpan message={errors.confirm_password.message} />
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Botao text={"Confirmar"} />
      </div>
    </Form>
  );
};
