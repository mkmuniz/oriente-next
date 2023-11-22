import styled from "styled-components";

const DivEstilizada = styled.div`
  padding: 20px;
  border: 0;
  border-radius: ${(props: any) => props.theme.espacamentos?.s};
  background-color: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.56);
  width: 270px;
  margin: 10px;
  position: relative; 
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 13px;
    margin-top: 13px;
  }

`

export const Card = ({ children }: any) => {
  return (<DivEstilizada>
    {children}
  </DivEstilizada>)
}