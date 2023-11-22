import styled from "styled-components";

const Div = styled.span`
  width: 28px;
  height: 28px;
  border: 4px solid #cc0c1c;
  border-bottom-color: transparent;
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

export default function Loader2() {
  return <Div />;
}
