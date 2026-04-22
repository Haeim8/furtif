'use client';

import {
  Box,
  VStack,
  Text,
  Icon,
  Flex,
  Avatar,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiTruck,
  FiCalendar,
  FiFileText,
  FiUsers,
  FiMail,
  FiSettings,
  FiAlertCircle,
  FiZap,
  FiDollarSign,
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', icon: FiHome, href: '/admin' },
  { name: 'Véhicules', icon: FiTruck, href: '/admin/vehicles' },
  { name: 'Promos Hero', icon: FiZap, href: '/admin/promo-cars' },
  { name: 'Réservations', icon: FiCalendar, href: '/admin/reservations' },
  { name: 'Paiements', icon: FiDollarSign, href: '/admin/payments' },
  { name: 'Clients', icon: FiUsers, href: '/admin/clients' },
  { name: 'Problèmes', icon: FiAlertCircle, href: '/admin/problems' },
  { name: 'Email', icon: FiMail, href: '/admin/email' },
  { name: 'Paramètres', icon: FiSettings, href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { colorMode } = useColorMode();

  return (
    <Box
      w="280px"
      h="100vh"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      borderRight="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      p={4}
      className="glass"
    >
      <VStack spacing={6} align="stretch" h="full">
        {/* Logo / Header */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="brand.600">
            Montreal Rental
          </Text>
          <Text fontSize="sm" color="gray.500">
            Admin Dashboard
          </Text>
        </Box>

        <Divider />

        {/* Navigation Menu */}
        <VStack spacing={2} align="stretch" flex="1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/admin' && pathname !== '/admin');

            return (
              <Link key={item.name} href={item.href}>
                <Flex
                  align="center"
                  gap={3}
                  p={3}
                  borderRadius="xl"
                  cursor="pointer"
                  bg={isActive ? 'brand.50' : 'transparent'}
                  color={isActive ? 'brand.600' : (colorMode === 'dark' ? 'gray.300' : 'gray.700')}
                  fontWeight={isActive ? 'semibold' : 'medium'}
                  _hover={{
                    bg: isActive ? 'brand.100' : (colorMode === 'dark' ? 'gray.700' : 'gray.50'),
                    transform: 'translateX(4px)',
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.name}</Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>

        <Divider />

        {/* User Profile */}
        <Flex align="center" gap={3} p={2}>
          <Avatar size="sm" name="Admin User" />
          <Box flex="1">
            <Text fontSize="sm" fontWeight="semibold">
              Admin User
            </Text>
            <Text fontSize="xs" color="gray.500">
              admin@rental.com
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
