'use client';

import { Box, Flex } from '@chakra-ui/react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box flex="1" overflow="auto" bg="gray.50">
        <AdminHeader />
        <Box p={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
