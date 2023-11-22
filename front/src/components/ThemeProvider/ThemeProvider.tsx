import { ThemeProvider } from "styled-components"

const tema = {
  cores: {
    branco: '#FFFFFF',
    focus: '#B009FF',
    verde: '006442',

    primarias: {
      a: '#CC0C1C'
      //a: 'rgb(255, 0, 30)',
      //a: '#E1001E'
    },
    secundarias: {
      a: '#E8DADA',
      b: '#cf2937'
    },
    neutras: {
      a: '#373737'
    },
    dark: {
      a: '',
      b: '#B61B00'
    }
  },
  espacamentos: {
    xs: '8px',
    s: '12px',
    l: '32px'
  },
  fontFamily: "'Montserrat', sans-serif"
}

export const ProvedorTema = ({ children }: any) => {
  return <ThemeProvider theme={tema}>
    {children}
  </ThemeProvider>
}