import styled from "styled-components";

const CardNotif = styled.div`
  padding: 0 10px 0 10px;
  border: 0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  width: 79%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: left;

  flex-direction: row;
  text-align: justify;
  color: #000000;
  margin-top: 20px;
  & > * {
    margin-bottom: 13px;
    margin-top: 13px;
  }
`;

export const CardNotificacao = ({ children }: any) => {
  return <CardNotif>{children}</CardNotif>;
};
