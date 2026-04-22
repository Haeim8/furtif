'use client';

import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiMail, FiMoon, FiSun } from 'react-icons/fi';

export function AdminHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      h="70px"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      borderBottom="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      px={8}
      className="glass"
    >
      <Flex h="full" align="center" justify="space-between">
        {/* Search Bar */}
        <InputGroup maxW="500px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher..."
            variant="glass"
          />
        </InputGroup>

        {/* Right Side - Notifications */}
        <Flex align="center" gap={4}>
          {/* Dark Mode Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            icon={<Icon as={colorMode === 'dark' ? FiSun : FiMoon} boxSize={5} />}
            variant="ghost"
            onClick={toggleColorMode}
          />

          {/* Email Notifications */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={FiMail} boxSize={5} />}
              variant="ghost"
              position="relative"
            >
              <Badge
                position="absolute"
                top="0"
                right="0"
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
              >
                3
              </Badge>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Box>
                  <Text fontWeight="semibold">Nouveau message</Text>
                  <Text fontSize="sm" color="gray.500">
                    De: client@example.com
                  </Text>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Bell Notifications */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={FiBell} boxSize={5} />}
              variant="ghost"
              position="relative"
            >
              <Badge
                position="absolute"
                top="0"
                right="0"
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
              >
                5
              </Badge>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Box>
                  <Text fontWeight="semibold">Nouvelle réservation</Text>
                  <Text fontSize="sm" color="gray.500">
                    Il y a 5 minutes
                  </Text>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Text fontWeight="semibold">Inspection en attente</Text>
                  <Text fontSize="sm" color="gray.500">
                    Il y a 1 heure
                  </Text>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
