import styled from "styled-components";
import { useState, useEffect } from "react";

const DivAlerta = styled.div`
  width: 600px;
  height: 80px;
  background-color: #ebfbf3;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: left;
  font-size: 20px;
  font-weight: 550;
  font-family: ${(props: any) => props.theme.fontFamily};
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.56);

  img{
    height: 34px;
  }

  @media (max-width: 650px) {
    width: 70%;
  }
`;

export const Alerta = ({ texto }: any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!texto) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [texto]);

  return (
    <>
      {visible && (
        <DivAlerta>
          <img src="../images/checked.png" />
          <span> {texto} </span>
        </DivAlerta>
      )}
    </>
  );
};
