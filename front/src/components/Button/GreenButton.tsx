import styled from "styled-components";

const BotaoEnviar = styled.button`
  background-color: #006442;
  border-radius: 90px;
  font-weight: 400;
  font-size: 14px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 8px 25px;
  :hover {
    background-color: #006442;
    transition: all 0.5s;
    transform: scale(1.1);
  }
  @media (max-width: 650px) {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  font-family: ${(props) => props.theme.fontFamily};
`;

export const BotaoVerde = ({ text, onClick }: any) => {
  return <BotaoEnviar onClick={onClick}> {text} </BotaoEnviar>;
};
