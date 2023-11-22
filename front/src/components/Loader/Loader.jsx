import styled from "styled-components";

const Div = styled.span`
  width: 100px;
  height: 100px;
  border: 5px solid #fff;
  border-bottom-color: #cc0c1c;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;



  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return <Div></Div>;
}

export default Loader;
