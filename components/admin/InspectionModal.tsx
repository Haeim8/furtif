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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Select,
  SimpleGrid,
  Icon,
  IconButton,
  Heading,
  Divider,
  Badge,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { FiCamera, FiUpload, FiX, FiCheck } from 'react-icons/fi';
import SignatureCanvas from 'react-signature-canvas';
import Image from 'next/image';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'DEPARTURE' | 'RETURN';
  reservation: any;
}

// Liste des photos requises pour chaque partie du véhicule
const REQUIRED_PHOTOS = [
  { id: 'front', label: 'Face Avant', required: true },
  { id: 'back', label: 'Face Arrière', required: true },
  { id: 'left-side', label: 'Latéral Gauche', required: true },
  { id: 'right-side', label: 'Latéral Droit', required: true },
  { id: 'front-left-wheel', label: 'Jante Avant Gauche', required: true },
  { id: 'front-right-wheel', label: 'Jante Avant Droite', required: true },
  { id: 'rear-left-wheel', label: 'Jante Arrière Gauche', required: true },
  { id: 'rear-right-wheel', label: 'Jante Arrière Droite', required: true },
  { id: 'dashboard', label: 'Tableau de Bord', required: true },
  { id: 'interior-front', label: 'Intérieur Avant', required: true },
  { id: 'interior-back', label: 'Intérieur Arrière', required: true },
  { id: 'trunk', label: 'Coffre', required: true },
  { id: 'roof', label: 'Toit', required: false },
  { id: 'hood', label: 'Capot', required: false },
  { id: 'license-plate', label: 'Plaque d\'Immatriculation', required: true },
];

export function InspectionModal({
  isOpen,
  onClose,
  type,
  reservation,
}: InspectionModalProps) {
  const [photos, setPhotos] = useState<{ [key: string]: string }>({});
  const [mileage, setMileage] = useState('');
  const [fuelLevel, setFuelLevel] = useState('100');
  const [remarks, setRemarks] = useState('');

  // Signatures
  const adminSignatureRef = useRef<SignatureCanvas>(null);
  const clientSignatureRef = useRef<SignatureCanvas>(null);

  const handlePhotoUpload = (photoId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos({ ...photos, [photoId]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (photoId: string) => {
    const newPhotos = { ...photos };
    delete newPhotos[photoId];
    setPhotos(newPhotos);
  };

  const clearAdminSignature = () => {
    adminSignatureRef.current?.clear();
  };

  const clearClientSignature = () => {
    clientSignatureRef.current?.clear();
  };

  const handleSubmit = async () => {
    // Vérifier que toutes les photos requises sont présentes
    const missingPhotos = REQUIRED_PHOTOS.filter(
      (p) => p.required && !photos[p.id]
    );

    if (missingPhotos.length > 0) {
      alert(`Photos manquantes : ${missingPhotos.map((p) => p.label).join(', ')}`);
      return;
    }

    if (!mileage) {
      alert('Veuillez entrer le kilométrage');
      return;
    }

    // Récupérer les signatures
    const adminSignature = adminSignatureRef.current?.toDataURL();
    const clientSignature = clientSignatureRef.current?.toDataURL();

    if (!adminSignature || adminSignatureRef.current?.isEmpty()) {
      alert('Signature de l\'agent manquante');
      return;
    }

    if (!clientSignature || clientSignatureRef.current?.isEmpty()) {
      alert('Signature du client manquante');
      return;
    }

    try {
      // Convertir les photos en array
      const photosArray = Object.values(photos);

      // Sauvegarder l'inspection en base de données
      const inspectionData = {
        type,
        reservationId: reservation.id,
        vehicleId: reservation.vehicleId,
        photos: photosArray,
        mileage: parseInt(mileage),
        fuelLevel: parseFloat(fuelLevel),
        damages: '', // Vide pour l'instant
        notes: remarks,
        signature: clientSignature, // Signature client
        signedBy: reservation.userId,
        signedAt: new Date().toISOString(),
      };

      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inspectionData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la sauvegarde');
      }

      alert(`Inspection de ${type === 'DEPARTURE' ? 'départ' : 'retour'} enregistrée avec succès !`);
      onClose();
    } catch (error: any) {
      console.error('Erreur sauvegarde inspection:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const requiredPhotosCount = REQUIRED_PHOTOS.filter((p) => p.required).length;
  const uploadedPhotosCount = Object.keys(photos).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass" maxH="90vh">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Heading size="md">
                Inspection de {type === 'DEPARTURE' ? 'Départ' : 'Retour'}
              </Heading>
              <Badge colorScheme={type === 'DEPARTURE' ? 'green' : 'blue'} fontSize="md">
                {type === 'DEPARTURE' ? 'Départ' : 'Retour'}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Client: {reservation?.client} • Véhicule: {reservation?.vehicle}
            </Text>
            <Badge colorScheme={uploadedPhotosCount >= requiredPhotosCount ? 'green' : 'yellow'}>
              Photos: {uploadedPhotosCount} / {requiredPhotosCount} requises
            </Badge>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={8} align="stretch">
            {/* Photos du Véhicule */}
            <Box>
              <Heading size="sm" mb={4}>
                Photos du Véhicule (Obligatoires marquées *)
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                {REQUIRED_PHOTOS.map((photoType) => (
                  <Card key={photoType.id} className="glass">
                    <CardBody>
                      <VStack spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                          {photoType.label}
                          {photoType.required && (
                            <Text as="span" color="red.500">
                              {' '}*
                            </Text>
                          )}
                        </Text>
                        {photos[photoType.id] ? (
                          <Box position="relative" w="full">
                            <Box
                              w="full"
                              h="120px"
                              borderRadius="md"
                              overflow="hidden"
                              border="2px solid"
                              borderColor="green.500"
                              position="relative"
                            >
                              <Image
                                src={photos[photoType.id]}
                                alt={photoType.label}
                                fill
                                unoptimized
                                style={{
                                  objectFit: 'cover',
                                }}
                              />
                            </Box>
                            <IconButton
                              aria-label="Supprimer"
                              icon={<Icon as={FiX} />}
                              size="xs"
                              colorScheme="red"
                              position="absolute"
                              top={1}
                              right={1}
                              onClick={() => removePhoto(photoType.id)}
                            />
                            <Badge
                              position="absolute"
                              bottom={1}
                              left={1}
                              colorScheme="green"
                            >
                              <Icon as={FiCheck} />
                            </Badge>
                          </Box>
                        ) : (
                          <Box
                            as="label"
                            htmlFor={`photo-${photoType.id}`}
                            w="full"
                            h="120px"
                            borderRadius="md"
                            border="2px dashed"
                            borderColor={photoType.required ? 'red.300' : 'gray.300'}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            bg="gray.50"
                            _hover={{ bg: 'gray.100', borderColor: 'brand.500' }}
                            transition="all 0.2s"
                          >
                            <Icon as={FiCamera} boxSize={8} color="gray.400" mb={1} />
                            <Text fontSize="xs" color="gray.500">
                              Ajouter
                            </Text>
                            <input
                              id={`photo-${photoType.id}`}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              style={{ display: 'none' }}
                              onChange={(e) => handlePhotoUpload(photoType.id, e)}
                            />
                          </Box>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            <Divider />

            {/* État du Véhicule */}
            <Box>
              <Heading size="sm" mb={4}>
                État du Véhicule
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Kilométrage (km)</FormLabel>
                  <NumberInput
                    value={mileage}
                    onChange={setMileage}
                    min={0}
                  >
                    <NumberInputField placeholder="Ex: 45230" />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Niveau de Carburant (%)</FormLabel>
                  <Select value={fuelLevel} onChange={(e) => setFuelLevel(e.target.value)}>
                    <option value="100">100% (Plein)</option>
                    <option value="87.5">7/8</option>
                    <option value="75">3/4</option>
                    <option value="62.5">5/8</option>
                    <option value="50">1/2</option>
                    <option value="37.5">3/8</option>
                    <option value="25">1/4</option>
                    <option value="12.5">1/8</option>
                    <option value="0">Vide</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Remarques */}
            <Box>
              <FormControl>
                <FormLabel>Remarques / Observations</FormLabel>
                <Textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Notez ici tout dommage, rayure, ou problème constaté..."
                  rows={4}
                />
              </FormControl>
            </Box>

            <Divider />

            {/* Signatures */}
            <Box>
              <Heading size="sm" mb={4}>
                Signatures
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Signature Agent */}
                <Box>
                  <FormLabel>Signature de l&apos;Agent *</FormLabel>
                  <Box
                    border="2px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    bg="white"
                    position="relative"
                  >
                    <SignatureCanvas
                      ref={adminSignatureRef}
                      canvasProps={{
                        width: 400,
                        height: 200,
                        className: 'signature-canvas',
                        style: { width: '100%', height: '200px' },
                      }}
                    />
                  </Box>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearAdminSignature}
                    mt={2}
                  >
                    Effacer
                  </Button>
                </Box>

                {/* Signature Client */}
                <Box>
                  <FormLabel>
                    Signature du Client ({reservation?.client}) *
                  </FormLabel>
                  <Box
                    border="2px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    bg="white"
                    position="relative"
                  >
                    <SignatureCanvas
                      ref={clientSignatureRef}
                      canvasProps={{
                        width: 400,
                        height: 200,
                        className: 'signature-canvas',
                        style: { width: '100%', height: '200px' },
                      }}
                    />
                  </Box>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearClientSignature}
                    mt={2}
                  >
                    Effacer
                  </Button>
                </Box>
              </SimpleGrid>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSubmit}
            leftIcon={<Icon as={FiCheck} />}
            isDisabled={uploadedPhotosCount < requiredPhotosCount}
          >
            Valider l&apos;Inspection
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
