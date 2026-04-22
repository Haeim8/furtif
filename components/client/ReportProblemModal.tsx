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
  Select,
  Textarea,
  FormControl,
  FormLabel,
  SimpleGrid,
  IconButton,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { FiAlertCircle, FiCamera, FiX, FiSend } from 'react-icons/fi';
import { useState, useRef } from 'react';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: any;
}

export function ReportProblemModal({
  isOpen,
  onClose,
  reservation,
}: ReportProblemModalProps) {
  const toast = useToast();
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!problemType || !description) {
      toast({
        title: 'Champs manquants',
        description: 'Veuillez remplir tous les champs obligatoires',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      // Convertir les photos en base64 (pour simplifier, à améliorer avec un vrai upload)
      const photosBase64 = await Promise.all(
        photos.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
      );

      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: reservation.userId,
          reservationId: reservation.id,
          type: problemType,
          description,
          photos: photosBase64, // En base64 pour l'instant
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast({
        title: 'Problème signalé',
        description: 'Nous avons bien reçu votre signalement. Notre équipe vous contactera sous peu.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le signalement',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={FiAlertCircle} boxSize={6} color="red.500" />
              <Text>Signaler un problème</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600" fontWeight="normal">
              Service 24/7 - Nous sommes là pour vous aider
            </Text>
            <Badge colorScheme="blue">
              {reservation.vehicle} - {reservation.id}
            </Badge>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Type de problème</FormLabel>
              <Select
                placeholder="Sélectionnez le type de problème"
                value={problemType}
                onChange={(e) => setProblemType(e.target.value)}
              >
                <option value="ACCIDENT">Accident</option>
                <option value="BREAKDOWN">Panne / Problème mécanique</option>
                <option value="DAMAGE">Dommage constaté</option>
                <option value="TIRE">Crevaison</option>
                <option value="FUEL">Problème de carburant</option>
                <option value="KEYS">Clés perdues/enfermées</option>
                <option value="OTHER">Autre</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description du problème</FormLabel>
              <Textarea
                placeholder="Décrivez le problème en détail... Où êtes-vous? Que s&apos;est-il passé?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Photos (optionnel)</FormLabel>
              <VStack spacing={3} align="stretch">
                <Box
                  p={6}
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor="gray.300"
                  borderRadius="lg"
                  bg="gray.50"
                  cursor="pointer"
                  onClick={() => photoInputRef.current?.click()}
                  transition="all 0.2s"
                  _hover={{ borderColor: 'brand.500' }}
                >
                  <VStack spacing={2}>
                    <Icon as={FiCamera} boxSize={8} color="gray.400" />
                    <Text fontSize="sm" color="gray.500">
                      Cliquez pour ajouter des photos
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      JPG, PNG (max 5 photos)
                    </Text>
                  </VStack>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handlePhotoUpload}
                  />
                </Box>

                {photos.length > 0 && (
                  <SimpleGrid columns={3} spacing={2}>
                    {photos.map((photo, index) => (
                      <Box key={index} position="relative">
                        <Box
                          h="80px"
                          bg="gray.100"
                          borderRadius="md"
                          overflow="hidden"
                          border="2px solid"
                          borderColor="green.400"
                        >
                          <Box
                            w="full"
                            h="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="xs" color="gray.500">
                              {photo.name}
                            </Text>
                          </Box>
                        </Box>
                        <IconButton
                          aria-label="Supprimer"
                          icon={<Icon as={FiX} />}
                          size="xs"
                          colorScheme="red"
                          position="absolute"
                          top={1}
                          right={1}
                          onClick={() => removePhoto(index)}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            </FormControl>

            <Box bg="orange.50" p={4} borderRadius="md" borderLeft="4px" borderColor="orange.400">
              <VStack align="start" spacing={2}>
                <HStack>
                  <Icon as={FiAlertCircle} color="orange.600" />
                  <Text fontWeight="semibold" color="orange.800">
                    En cas d&apos;urgence
                  </Text>
                </HStack>
                <Text fontSize="sm" color="orange.700">
                  Si vous êtes en danger immédiat, appelez le 911 d&apos;abord.
                  Pour une assistance routière, contactez-nous au +1 (514) 555-0123
                </Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<Icon as={FiSend} />}
            onClick={handleSubmit}
            isDisabled={!problemType || !description}
          >
            Envoyer le signalement
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
