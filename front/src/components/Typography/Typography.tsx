import styled from "styled-components"

const componentes: any = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body1Bold: 'strong',
  body2: 'p',
  body2Bold: 'strong',
  subtitle1: 'p',
  subtitle2: 'p'
}

const estilos: any = {
  h1: `
    font-weight: 600;
    font-size: 40px;
    line-height: 49px;`,
  h2: `
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;`,
  h3: `
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;`,
  headline: `
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;`,
  body1: `
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;`,
  body1Bold: `
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;`,
  body2: `
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;`,
  body2Bold: `
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;`,
  subtitle1: `
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;`,
  subtitle2: `
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-decoration-line: underline;
  `
}

export const Tipografia = ({ variante, componente, children }: any) => {
  const tag = componentes[componente]
  const Componente = styled[tag]`${estilos[variante]}`
  return (<Componente>
    {children}
  </Componente>)
}
