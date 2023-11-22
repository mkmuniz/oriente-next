import styled from "styled-components";

const OverlayDiv: any = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props: any) => (props.visible ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s;
  backdrop-filter: blur(5px);
`;

export const Overlay = ({ visible, children }: any) => {
  return (
    <OverlayDiv visible={visible}>
      {children}
    </OverlayDiv>
  )
}