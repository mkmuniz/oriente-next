import styled from "styled-components";
import { useRouter } from "next/navigation";

const NotOrientador = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: row;
  text-align: left;
  color: #000000;
  padding: 0px 10px 0px 10px;
`;

export const NotificacaoRecusado = ({ nome }: any) => {
  const router = useRouter();

  function clickHandler() {
    router.push("/projeto");
  }

  return (
    <NotOrientador>
      <h3>
        {` O(A) orientador(a) ${nome} recusou o seu projeto. Você pode submeter um novo projeto na aba projeto.`}
      </h3>
    </NotOrientador>
  );
};
