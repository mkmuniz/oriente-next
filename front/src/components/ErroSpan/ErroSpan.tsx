import styled from "styled-components";

const Span = styled.span`
  color: #cc0c1c;
  font-size: 12px;
  font-weight: bold;
`;

export const ErroSpan = ({ message }: any) => {
  return <Span>{message}</Span>;
};
