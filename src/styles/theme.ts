import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    purple: {
      500: '#8615df',
      600: '#570e91',
      800: '#38085c',
    },
    gray: {
      50: '#F6F6F7',
      100: '#9e9ea7',
      300: '#666665',
      900: '#111111',
    },
    red: {
      600: '#df1545',
    },
    green: {
      600: '#25d970',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      },
    },
  },
});
