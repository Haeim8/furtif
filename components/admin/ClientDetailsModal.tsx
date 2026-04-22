'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Heading,
  Divider,
  Badge,
  Icon,
  SimpleGrid,
  Avatar,
} from '@chakra-ui/react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
} from 'react-icons/fi';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export function ClientDetailsModal({ isOpen, onClose, client }: ClientDetailsModalProps) {
  if (!client) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass">
        <ModalHeader>
          <HStack spacing={4}>
            <Avatar size="lg" name={client.name} />
            <Box>
              <Heading size="md">{client.name}</Heading>
              <Text fontSize="sm" color="gray.600">
                Client #{client.id}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Informations de Contact */}
            <Box>
              <Heading size="sm" mb={3}>
                Informations de Contact
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                <HStack>
                  <Icon as={FiMail} color="gray.500" />
                  <Box>
                    <Text fontSize="xs" color="gray.500">
                      Email
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {client.email}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Icon as={FiPhone} color="gray.500" />
                  <Box>
                    <Text fontSize="xs" color="gray.500">
                      Téléphone
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {client.phone || 'Non renseigné'}
                    </Text>
                  </Box>
                </HStack>
                <HStack gridColumn="span 2">
                  <Icon as={FiMapPin} color="gray.500" />
                  <Box>
                    <Text fontSize="xs" color="gray.500">
                      Adresse
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {client.address || 'Non renseignée'}
                    </Text>
                  </Box>
                </HStack>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Documents */}
            <Box>
              <Heading size="sm" mb={3}>
                Documents
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                <HStack spacing={3}>
                  <Icon
                    as={client.hasDriverLicense ? FiCheckCircle : FiXCircle}
                    color={client.hasDriverLicense ? 'green.500' : 'red.500'}
                    boxSize={5}
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold">
                      Permis de Conduire
                    </Text>
                    <Badge colorScheme={client.hasDriverLicense ? 'green' : 'red'} fontSize="xs">
                      {client.hasDriverLicense ? 'Vérifié' : 'Non vérifié'}
                    </Badge>
                  </Box>
                </HStack>
                <HStack spacing={3}>
                  <Icon
                    as={client.hasIBAN ? FiCheckCircle : FiXCircle}
                    color={client.hasIBAN ? 'green.500' : 'red.500'}
                    boxSize={5}
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold">
                      RIB / IBAN
                    </Text>
                    <Badge colorScheme={client.hasIBAN ? 'green' : 'red'} fontSize="xs">
                      {client.hasIBAN ? 'Vérifié' : 'Non vérifié'}
                    </Badge>
                  </Box>
                </HStack>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Réservation en cours */}
            <Box>
              <Heading size="sm" mb={3}>
                Réservation en Cours
              </Heading>
              <VStack align="stretch" spacing={2} bg="blue.50" p={4} borderRadius="md">
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Véhicule:
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold">
                    {client.vehicle}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Période:
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold">
                    {client.startDate} → {client.endDate}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Montant Total:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="green.600">
                    {client.totalPrice}$
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Caution:
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold">
                    {client.deposit}$
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Statut:
                  </Text>
                  <Badge colorScheme="blue">{client.status}</Badge>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Historique - Placeholder */}
            <Box>
              <Heading size="sm" mb={3}>
                Historique de Locations
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {client.totalRentals || 1} location(s) au total
              </Text>
              <Text fontSize="sm" color="gray.600" mt={2}>
                <Icon as={FiDollarSign} boxSize={4} mr={1} />
                Total dépensé: <strong>{client.totalSpent || client.totalPrice}$</strong>
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Fermer
          </Button>
          <Button colorScheme="brand">Modifier le Client</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
