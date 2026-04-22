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
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Textarea,
  VStack,
  HStack,
  Grid,
  Icon,
  Box,
  Text,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddVehicleModal({ isOpen, onClose }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    licensePlate: '',
    vin: '',
    type: 'SEDAN',
    transmission: 'AUTOMATIC',
    fuelType: 'ESSENCE',
    seats: 5,
    doors: 4,
    fuelConsumption: 7.5,
    pricePerDay: 45,
    deposit: 500,
    features: [] as string[],
    images: [] as string[],
  });

  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = async () => {
    try {
      // Validation basique
      if (!formData.brand || !formData.model || !formData.licensePlate) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Créer le véhicule via l'API
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mainImage: formData.images[0] || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création');
      }

      alert('Véhicule ajouté avec succès !');
      onClose();
      // Rafraîchir la page pour voir le nouveau véhicule
      window.location.reload();
    } catch (error: any) {
      console.error('Erreur création véhicule:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass">
        <ModalHeader>Ajouter un Nouveau Véhicule</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Informations de base */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Informations de Base
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isRequired>
                  <FormLabel>Marque</FormLabel>
                  <Input
                    placeholder="Toyota, Ford, Tesla..."
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Modèle</FormLabel>
                  <Input
                    placeholder="Corolla, F-150, Model 3..."
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Année</FormLabel>
                  <NumberInput
                    min={2000}
                    max={2030}
                    value={formData.year}
                    onChange={(_, val) =>
                      setFormData({ ...formData, year: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Couleur</FormLabel>
                  <Input
                    placeholder="Noir, Blanc, Rouge..."
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Plaque d&apos;Immatriculation</FormLabel>
                  <Input
                    placeholder="ABC-123"
                    value={formData.licensePlate}
                    onChange={(e) =>
                      setFormData({ ...formData, licensePlate: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Numéro de Série (VIN)</FormLabel>
                  <Input
                    placeholder="1HGBH41JXMN109186"
                    value={formData.vin}
                    onChange={(e) =>
                      setFormData({ ...formData, vin: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
            </Box>

            {/* Type et caractéristiques */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Type et Caractéristiques
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isRequired>
                  <FormLabel>Type de Véhicule</FormLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="SEDAN">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="PICKUP">Pick-up</option>
                    <option value="VAN">Fourgonnette</option>
                    <option value="SPORT">Sport</option>
                    <option value="LUXURY">Luxe</option>
                    <option value="ELECTRIC">Électrique</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Transmission</FormLabel>
                  <Select
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                  >
                    <option value="AUTOMATIC">Automatique</option>
                    <option value="MANUAL">Manuelle</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Type de Carburant</FormLabel>
                  <Select
                    value={formData.fuelType}
                    onChange={(e) =>
                      setFormData({ ...formData, fuelType: e.target.value })
                    }
                  >
                    <option value="ESSENCE">Essence</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="HYBRID">Hybride</option>
                    <option value="ELECTRIC">Électrique</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Consommation (L/100km)</FormLabel>
                  <NumberInput
                    min={0}
                    step={0.1}
                    value={formData.fuelConsumption}
                    onChange={(_, val) =>
                      setFormData({ ...formData, fuelConsumption: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Nombre de Sièges</FormLabel>
                  <NumberInput
                    min={2}
                    max={9}
                    value={formData.seats}
                    onChange={(_, val) =>
                      setFormData({ ...formData, seats: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Nombre de Portes</FormLabel>
                  <NumberInput
                    min={2}
                    max={5}
                    value={formData.doors}
                    onChange={(_, val) =>
                      setFormData({ ...formData, doors: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Grid>
            </Box>

            {/* Prix */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Tarification
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isRequired>
                  <FormLabel>Prix par Jour ($)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.pricePerDay}
                    onChange={(_, val) =>
                      setFormData({ ...formData, pricePerDay: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Caution ($)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.deposit}
                    onChange={(_, val) =>
                      setFormData({ ...formData, deposit: val })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Grid>
            </Box>

            {/* Équipements */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Équipements et Options
              </Text>
              <HStack mb={2}>
                <Input
                  placeholder="GPS, Bluetooth, Climatisation..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <Button onClick={addFeature} colorScheme="brand">
                  Ajouter
                </Button>
              </HStack>
              <HStack wrap="wrap" spacing={2}>
                {formData.features.map((feature, index) => (
                  <Box
                    key={index}
                    px={3}
                    py={1}
                    bg="brand.50"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Text fontSize="sm">{feature}</Text>
                    <IconButton
                      aria-label="Supprimer"
                      icon={<Icon as={FiX} />}
                      size="xs"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
                    />
                  </Box>
                ))}
              </HStack>
            </Box>

            {/* Images */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Images du Véhicule
              </Text>
              <Button
                leftIcon={<Icon as={FiUpload} />}
                variant="outline"
                w="full"
              >
                Télécharger des Images
              </Button>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Formats acceptés: JPG, PNG. Taille max: 5MB par image.
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit}>
            Ajouter le Véhicule
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
