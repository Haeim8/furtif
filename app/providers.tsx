'use client';

import { SessionProvider } from 'next-auth/react';

// ChakraUI a été désactivé pour la refonte Furtif (Tailwind pur)
// import { ChakraProvider } from '@chakra-ui/react';
// import theme from '@/lib/chakra-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <ChakraProvider theme={theme}> */}
        {children}
      {/* </ChakraProvider> */}
    </SessionProvider>
  );
}
