import styled from "styled-components";
import { useState } from "react";

const InputEstilizada = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: ${props => props.theme.espacamentos.s};
    background: ${props => props.theme.cores.brancas}; 
    background-color: ${props => props.theme.cores.secundarias.a};
    border: 0;
    border-radius: ${props => props.theme.espacamentos.s};
    height: 40px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 10px;

    @media (max-width: 1000px) {
      max-width: 100%;
    }

    ::placeholder {
      color: ${props => props.theme.cores.neutras.a};
      font-family: ${props => props.theme.fontFamily};
      padding: 0 5px;
    }
`

export const CampoTexto = ({ label, tipo}: any) => {
  const [placeholder, setPlaceholder] = useState(label);
  const [valor, setValor] = useState('');
  
  const handleChange = (event: any) => {
    setValor(event.target.value);
  };

  const handleClick = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (placeholder === '') {
      setPlaceholder(label);
    }
  };

  return (
    <InputEstilizada
      type={tipo}
      value={valor}
      placeholder={placeholder}
      onClick={handleClick}
      onBlur={handleBlur} 
      onChange = {handleChange}
    />
  );
};