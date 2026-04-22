'use client';

import {
  Box,
  Container,
  HStack,
  Button,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import {
  FiTruck,
  FiUser,
  FiCalendar,
  FiLogIn,
  FiMoon,
  FiSun,
  FiMenu,
} from 'react-icons/fi';
import Link from 'next/link';

export function ClientNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  // TODO: Remplacer par vraie authentification
  const isAuthenticated = false;

  return (
    <Box
      as="nav"
      className="glass"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Container maxW="container.xl" py={4}>
        <HStack justify="space-between">
          {/* Logo */}
          <HStack as={Link} href="/" spacing={2} cursor="pointer">
            <Icon as={FiTruck} boxSize={8} color="brand.500" />
            <Text fontSize="xl" fontWeight="bold">
              Montreal Car Rental
            </Text>
          </HStack>

          {/* Desktop Navigation */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            <Button
              variant="ghost"
              leftIcon={<Icon as={FiTruck} />}
              as={Link}
              href="/vehicles"
            >
              Véhicules
            </Button>

            {isAuthenticated && (
              <Button
                variant="ghost"
                leftIcon={<Icon as={FiCalendar} />}
                as={Link}
                href="/my-reservations"
              >
                Mes Réservations
              </Button>
            )}

            <IconButton
              aria-label="Toggle color mode"
              icon={<Icon as={colorMode === 'dark' ? FiSun : FiMoon} />}
              variant="ghost"
              onClick={toggleColorMode}
            />

            {isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name="User Name" />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<Icon as={FiUser} />} as={Link} href="/profile">
                    Mon Profil
                  </MenuItem>
                  <MenuItem icon={<Icon as={FiCalendar} />} as={Link} href="/my-reservations">
                    Mes Réservations
                  </MenuItem>
                  <MenuItem>Déconnexion</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                colorScheme="brand"
                leftIcon={<Icon as={FiLogIn} />}
                as={Link}
                href="/login"
              >
                Connexion
              </Button>
            )}
          </HStack>

          {/* Mobile Menu */}
          <IconButton
            aria-label="Menu"
            icon={<Icon as={FiMenu} />}
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
          />
        </HStack>
      </Container>
    </Box>
  );
}
