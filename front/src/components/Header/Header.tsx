import styled from "styled-components"

const ImagemCabecalho: any = styled.header`
background: ${(props: any) => props.theme.cores?.primarias.a};
  width: 100%;
  padding: 10px 0; 
  max-height: 65px; 
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  z-index: 100;
`

const Logo = styled.img`
  max-height: 40px;
`

export const Cabecalho = () => {
  return (
    <ImagemCabecalho>
      <Logo src="./images/image 1.png" alt="logo" />
    </ImagemCabecalho>
  )
}
