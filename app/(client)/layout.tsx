import { ClientFooter } from '@/components/client/ClientFooter';
import { Box } from '@chakra-ui/react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        {children}
      </Box>
      <ClientFooter />
    </Box>
  );
}
