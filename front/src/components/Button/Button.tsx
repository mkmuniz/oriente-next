import styled from "styled-components";

const BotaoEnviar = styled.button`
  background-color: ${(props: any) => props.theme.cores?.primarias.a};
  border-radius: 90px;
  font-weight: 400;
  font-size: 14px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 8px 25px;
  :hover {
    background-color: ${(props: any) => props.theme.cores?.secundarias.b};
    transition: all 0.5s;
    transform: scale(1.1);
  }
  @media (max-width: 650px) {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  font-family: ${(props: any) => props.theme.fontFamily};
`;

export const Botao = ({ text, onClick }: any) => {
  return <BotaoEnviar onClick={onClick}> {text} </BotaoEnviar>;
};
