import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Design Glassmorphism inspiré de iOS 26 avec support Dark Mode
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('white', '#0a0a0a')(props),
        color: mode('gray.900', 'white')(props),
      },
      '*::placeholder': {
        color: mode('gray.400', 'gray.500')(props),
      },
    }),
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  components: {
    // Card avec effet glass
    Card: {
      baseStyle: (props: any) => ({
        container: {
          background: mode('white', '#1a1a1a')(props),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: mode('gray.200', '#2a2a2a')(props),
          boxShadow: mode('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.5)')(props),
          borderRadius: '16px',
        },
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
      },
      variants: {
        glass: (props: any) => ({
          bg: mode('rgba(255, 255, 255, 0.7)', '#1a1a1a')(props),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: mode('rgba(255, 255, 255, 0.3)', '#2a2a2a')(props),
          boxShadow: mode('0 8px 32px 0 rgba(31, 38, 135, 0.1)', '0 8px 32px 0 rgba(0, 0, 0, 0.3)')(props),
          _hover: {
            bg: mode('rgba(255, 255, 255, 0.9)', '#2a2a2a')(props),
            transform: 'translateY(-2px)',
            boxShadow: mode('0 12px 40px 0 rgba(31, 38, 135, 0.15)', '0 12px 40px 0 rgba(0, 0, 0, 0.4)')(props),
          },
          transition: 'all 0.3s ease',
        }),
        solid: (props: any) => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.3s ease',
        }),
      },
    },
    Input: {
      variants: {
        glass: (props: any) => ({
          field: {
            bg: mode('rgba(255, 255, 255, 0.5)', '#1a1a1a')(props),
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: mode('rgba(255, 255, 255, 0.3)', '#2a2a2a')(props),
            borderRadius: 'xl',
            color: mode('gray.900', 'white')(props),
            _focus: {
              bg: mode('rgba(255, 255, 255, 0.7)', '#2a2a2a')(props),
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'glass',
      },
    },
    Select: {
      variants: {
        glass: (props: any) => ({
          field: {
            bg: mode('rgba(255, 255, 255, 0.5)', '#1a1a1a')(props),
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: mode('rgba(255, 255, 255, 0.3)', '#2a2a2a')(props),
            borderRadius: 'xl',
            color: mode('gray.900', 'white')(props),
            _focus: {
              bg: mode('rgba(255, 255, 255, 0.7)', '#2a2a2a')(props),
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'glass',
      },
    },
    Textarea: {
      variants: {
        glass: (props: any) => ({
          bg: mode('rgba(255, 255, 255, 0.5)', '#1a1a1a')(props),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: mode('rgba(255, 255, 255, 0.3)', '#2a2a2a')(props),
          borderRadius: 'xl',
          color: mode('gray.900', 'white')(props),
          _focus: {
            bg: mode('rgba(255, 255, 255, 0.7)', '#2a2a2a')(props),
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        }),
      },
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: mode('white', '#1a1a1a')(props),
          color: mode('gray.900', 'white')(props),
        },
      }),
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: mode('white', '#1a1a1a')(props),
          borderColor: mode('gray.200', '#2a2a2a')(props),
        },
        item: {
          bg: mode('white', '#1a1a1a')(props),
          color: mode('gray.900', 'white')(props),
          _hover: {
            bg: mode('gray.100', '#2a2a2a')(props),
          },
        },
      }),
    },
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    'glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
  },
});

export default theme;
