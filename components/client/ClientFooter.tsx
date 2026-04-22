'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Link as ChakraLink,
  Icon,
  HStack,
  Divider,
} from '@chakra-ui/react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from 'react-icons/fi';
import Link from 'next/link';

export function ClientFooter() {
  return (
    <Box bg="gray.900" color="white" mt="auto">
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          {/* Logo & Description */}
          <Stack spacing={4}>
            <HStack>
              <Icon as={FiTruck} boxSize={8} color="brand.400" />
              <Heading size="md">Montreal Car Rental</Heading>
            </HStack>
            <Text fontSize="sm" color="gray.400">
              Votre partenaire de confiance pour la location de véhicules à Montréal depuis 2020.
            </Text>
            <HStack spacing={4}>
              <Icon as={FiFacebook} boxSize={5} cursor="pointer" _hover={{ color: 'brand.400' }} />
              <Icon as={FiInstagram} boxSize={5} cursor="pointer" _hover={{ color: 'brand.400' }} />
              <Icon as={FiTwitter} boxSize={5} cursor="pointer" _hover={{ color: 'brand.400' }} />
            </HStack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={4}>
            <Heading size="sm">Liens Rapides</Heading>
            <ChakraLink as={Link} href="/vehicles" fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              Nos Véhicules
            </ChakraLink>
            <ChakraLink as={Link} href="/about" fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              À Propos
            </ChakraLink>
            <ChakraLink as={Link} href="/contact" fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              Contact
            </ChakraLink>
            <ChakraLink as={Link} href="/faq" fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              FAQ
            </ChakraLink>
          </Stack>

          {/* Legal */}
          <Stack spacing={4}>
            <Heading size="sm">Légal</Heading>
            <ChakraLink fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              Conditions d&apos;utilisation
            </ChakraLink>
            <ChakraLink fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              Politique de confidentialité
            </ChakraLink>
            <ChakraLink fontSize="sm" color="gray.400" _hover={{ color: 'white' }}>
              Politique d&apos;annulation
            </ChakraLink>
          </Stack>

          {/* Contact */}
          <Stack spacing={4}>
            <Heading size="sm">Contact</Heading>
            <HStack spacing={3}>
              <Icon as={FiMapPin} color="brand.400" />
              <Text fontSize="sm" color="gray.400">
                123 Rue Principale<br />
                Montréal, QC H3A 1B1
              </Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FiPhone} color="brand.400" />
              <Text fontSize="sm" color="gray.400">
                +1 (514) 555-0123
              </Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FiMail} color="brand.400" />
              <Text fontSize="sm" color="gray.400">
                contact@montrealrental.com
              </Text>
            </HStack>
          </Stack>
        </SimpleGrid>

        <Divider my={8} borderColor="gray.700" />

        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            © 2025 Montreal Car Rental. Tous droits réservés.
          </Text>
          <Text fontSize="sm" color="gray.500">
            Service 24/7 disponible
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
