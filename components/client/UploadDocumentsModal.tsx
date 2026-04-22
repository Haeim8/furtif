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
  Progress,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { FiUpload, FiCheckCircle, FiFileText, FiCreditCard } from 'react-icons/fi';
import { useState, useRef } from 'react';

interface UploadDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: any;
}

export function UploadDocumentsModal({
  isOpen,
  onClose,
  reservation,
}: UploadDocumentsModalProps) {
  const toast = useToast();
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [iban, setIban] = useState<File | null>(null);
  const driverLicenseRef = useRef<HTMLInputElement>(null);
  const ibanRef = useRef<HTMLInputElement>(null);

  const handleDriverLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDriverLicense(file);
    }
  };

  const handleIbanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIban(file);
    }
  };

  const handleSubmit = async () => {
    if (!driverLicense || !iban) {
      toast({
        title: 'Documents manquants',
        description: 'Veuillez uploader tous les documents requis',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      // Convertir les fichiers en base64
      const driverLicenseBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(driverLicense);
      });

      const ibanBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(iban);
      });

      // Mettre à jour l'utilisateur avec les documents
      const response = await fetch(`/api/clients/${reservation.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverLicense: driverLicenseBase64,
          iban: ibanBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      toast({
        title: 'Documents uploadés',
        description: 'Vos documents ont été envoyés avec succès',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'uploader les documents',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const progress = ((driverLicense ? 50 : 0) + (iban ? 50 : 0));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text>Uploader les documents requis</Text>
            <Text fontSize="sm" color="gray.600" fontWeight="normal">
              Réservation: {reservation.vehicle} - {reservation.id}
            </Text>
            <HStack w="full">
              <Progress value={progress} flex="1" colorScheme="green" borderRadius="full" />
              <Text fontSize="sm" fontWeight="semibold" color="green.600">
                {progress}%
              </Text>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Permis de conduire */}
            <Box
              p={6}
              borderWidth="2px"
              borderStyle="dashed"
              borderColor={driverLicense ? 'green.400' : 'gray.300'}
              borderRadius="lg"
              bg={driverLicense ? 'green.50' : 'gray.50'}
              cursor="pointer"
              onClick={() => driverLicenseRef.current?.click()}
              transition="all 0.2s"
              _hover={{ borderColor: 'brand.500' }}
            >
              <VStack spacing={3}>
                <Icon
                  as={driverLicense ? FiCheckCircle : FiFileText}
                  boxSize={12}
                  color={driverLicense ? 'green.500' : 'gray.400'}
                />
                <VStack spacing={1}>
                  <Text fontWeight="semibold">
                    {driverLicense ? 'Permis de conduire uploadé' : 'Permis de conduire'}
                  </Text>
                  {driverLicense ? (
                    <Text fontSize="sm" color="gray.600">
                      {driverLicense.name}
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="gray.500">
                      Cliquez pour uploader (PDF, JPG, PNG)
                    </Text>
                  )}
                </VStack>
                {driverLicense && (
                  <Badge colorScheme="green">
                    <Icon as={FiCheckCircle} mr={1} />
                    Validé
                  </Badge>
                )}
              </VStack>
              <input
                ref={driverLicenseRef}
                type="file"
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                onChange={handleDriverLicenseUpload}
              />
            </Box>

            {/* RIB/IBAN */}
            <Box
              p={6}
              borderWidth="2px"
              borderStyle="dashed"
              borderColor={iban ? 'green.400' : 'gray.300'}
              borderRadius="lg"
              bg={iban ? 'green.50' : 'gray.50'}
              cursor="pointer"
              onClick={() => ibanRef.current?.click()}
              transition="all 0.2s"
              _hover={{ borderColor: 'brand.500' }}
            >
              <VStack spacing={3}>
                <Icon
                  as={iban ? FiCheckCircle : FiCreditCard}
                  boxSize={12}
                  color={iban ? 'green.500' : 'gray.400'}
                />
                <VStack spacing={1}>
                  <Text fontWeight="semibold">
                    {iban ? 'RIB/IBAN uploadé' : 'RIB / IBAN'}
                  </Text>
                  {iban ? (
                    <Text fontSize="sm" color="gray.600">
                      {iban.name}
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="gray.500">
                      Cliquez pour uploader (PDF, JPG, PNG)
                    </Text>
                  )}
                </VStack>
                {iban && (
                  <Badge colorScheme="green">
                    <Icon as={FiCheckCircle} mr={1} />
                    Validé
                  </Badge>
                )}
              </VStack>
              <input
                ref={ibanRef}
                type="file"
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                onChange={handleIbanUpload}
              />
            </Box>

            <Box bg="blue.50" p={4} borderRadius="md">
              <Text fontSize="sm" color="blue.800">
                <strong>Important:</strong> Les documents doivent être clairs et lisibles.
                Votre permis de conduire doit être valide et le RIB à votre nom.
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button
            colorScheme="green"
            leftIcon={<Icon as={FiUpload} />}
            onClick={handleSubmit}
            isDisabled={!driverLicense || !iban}
          >
            Envoyer les documents
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
