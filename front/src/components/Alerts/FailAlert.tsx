import styled from "styled-components";
import { useState, useEffect } from "react";

const DivAlertaFalha = styled.div`
  width: 600px;
  height: 80px;
  background-color: rgb(253, 237, 239);
  display: flex;
  align-items: center;
  gap: 13.5px;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 10px;
  text-align: left;
  font-size: 20px;
  font-weight: 550;
  font-family: ${(props: any) => props.theme.fontFamily};
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.56);

  img{
    height: 31.5px;
  }

  @media (max-width: 650px) {
    width: 70%;
  }
`;

export const AlertaFalha = ({ texto }: any) => {
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
        <DivAlertaFalha>
          <img src="../images/warning-3.png" />
          <span> {texto} </span>
        </DivAlertaFalha>
      )}
    </>
  );
};
