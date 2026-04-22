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
  Icon,
  Checkbox,
  Divider,
  Badge,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiCheckCircle, FiXCircle, FiFileText, FiCreditCard } from 'react-icons/fi';
import { useState } from 'react';

interface ValidateDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: any;
  onValidate: (hasDriverLicense: boolean, hasIBAN: boolean) => void;
}

export function ValidateDocumentsModal({
  isOpen,
  onClose,
  reservation,
  onValidate,
}: ValidateDocumentsModalProps) {
  const [hasDriverLicense, setHasDriverLicense] = useState(reservation?.hasDriverLicense || false);
  const [hasIBAN, setHasIBAN] = useState(reservation?.hasIBAN || false);

  if (!reservation) return null;

  const handleValidate = () => {
    onValidate(hasDriverLicense, hasIBAN);
    onClose();
  };

  const canProceed = hasDriverLicense && hasIBAN;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text>Validation des Documents</Text>
            <Text fontSize="sm" color="gray.600" fontWeight="normal">
              {reservation.client} - {reservation.vehicle}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Alert status="info">
              <AlertIcon />
              <Text fontSize="sm">
                Vérifiez et validez les documents du client sur place avant de procéder à l&apos;inspection de départ.
              </Text>
            </Alert>

            {/* État actuel */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                État actuel des documents:
              </Text>
              <VStack spacing={2} align="stretch">
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <HStack>
                    <Icon
                      as={FiFileText}
                      color={reservation.hasDriverLicense ? 'green.500' : 'red.500'}
                    />
                    <Text fontSize="sm">Permis de Conduire</Text>
                  </HStack>
                  <Badge colorScheme={reservation.hasDriverLicense ? 'green' : 'red'}>
                    {reservation.hasDriverLicense ? 'Reçu' : 'Manquant'}
                  </Badge>
                </HStack>
                <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <HStack>
                    <Icon
                      as={FiCreditCard}
                      color={reservation.hasIBAN ? 'green.500' : 'red.500'}
                    />
                    <Text fontSize="sm">RIB / IBAN</Text>
                  </HStack>
                  <Badge colorScheme={reservation.hasIBAN ? 'green' : 'red'}>
                    {reservation.hasIBAN ? 'Reçu' : 'Manquant'}
                  </Badge>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Validation */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                Validation sur place:
              </Text>
              <VStack spacing={4} align="stretch">
                <Box p={4} borderWidth="2px" borderColor={hasDriverLicense ? 'green.300' : 'gray.200'} borderRadius="md">
                  <Checkbox
                    size="lg"
                    isChecked={hasDriverLicense}
                    onChange={(e) => setHasDriverLicense(e.target.checked)}
                    colorScheme="green"
                  >
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="semibold">Permis de Conduire Valide</Text>
                      <Text fontSize="xs" color="gray.600">
                        J&apos;ai vérifié et scanné le permis de conduire du client
                      </Text>
                    </VStack>
                  </Checkbox>
                </Box>

                <Box p={4} borderWidth="2px" borderColor={hasIBAN ? 'green.300' : 'gray.200'} borderRadius="md">
                  <Checkbox
                    size="lg"
                    isChecked={hasIBAN}
                    onChange={(e) => setHasIBAN(e.target.checked)}
                    colorScheme="green"
                  >
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="semibold">RIB / IBAN Reçu</Text>
                      <Text fontSize="xs" color="gray.600">
                        J&apos;ai reçu et enregistré le RIB/IBAN du client
                      </Text>
                    </VStack>
                  </Checkbox>
                </Box>
              </VStack>
            </Box>

            {!canProceed && (
              <Alert status="warning">
                <AlertIcon />
                <Text fontSize="sm">
                  Les deux documents sont requis pour procéder à l&apos;inspection de départ.
                </Text>
              </Alert>
            )}

            {canProceed && (
              <Alert status="success">
                <AlertIcon />
                <Text fontSize="sm">
                  Tous les documents sont validés. Vous pouvez maintenant procéder à l&apos;inspection!
                </Text>
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button
            colorScheme="green"
            leftIcon={<Icon as={FiCheckCircle} />}
            onClick={handleValidate}
            isDisabled={!canProceed}
          >
            Valider et Continuer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
