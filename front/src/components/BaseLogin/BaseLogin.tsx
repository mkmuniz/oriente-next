"use client"

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from '@/components/Card/Card';
import { Tipografia } from '@/components/Typography/Typography';
import { Cabecalho } from '@/components/Header/Header';

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("../images/image 3.png");
  background-size: cover;
  background-position: center;
  box-shadow: inset 0px 4px 222px rgba(0, 0, 0, 0.25);
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;
`

const Conteudo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const BaseLogin = ({ texto, children, tamanho, variante, componente }: any) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const baseHeight = document.getElementById("base")!.offsetHeight;
      setIsOverflow(baseHeight > windowHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Base id="base" style={{ overflowY: isOverflow ? "auto" : "initial" }}>
      <Cabecalho />
      <Conteudo>
        <Card>
          <img src="./images/image 2.png" alt="logo" height={tamanho} />
          <Tipografia variante={variante} componente={componente} >
            {texto}
          </Tipografia>
          {children}
        </Card>
      </Conteudo>
    </Base>
  );
}
