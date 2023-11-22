import { Global } from "@emotion/react"

const estilos = (tema: any) => {
  return {
    html: {
      fontFamily: tema.fontFamily
    },
    body: {
      margin: 0
    }
}
}

export const Estilos = () => {
  return (<Global styles={estilos} />)
}