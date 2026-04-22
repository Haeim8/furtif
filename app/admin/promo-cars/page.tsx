'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Image,
  useDisclosure,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiImage,
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

export default function PromoVehiclesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [editingPromo, setEditingPromo] = useState<any>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/promo-vehicles');
      const data = await response.json();
      setPromos(data);
    } catch (error) {
      console.error('Erreur chargement promos:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les véhicules promotionnels',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const promoData = {
        name,
        image: imagePreview || 'https://via.placeholder.com/800',
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        active: true,
        order: editingPromo?.order || promos.length,
      };

      if (editingPromo) {
        // Update existing promo
        const response = await fetch(`/api/promo-vehicles/${editingPromo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(promoData),
        });

        if (!response.ok) throw new Error('Erreur lors de la mise à jour');

        toast({
          title: 'Promo mise à jour',
          status: 'success',
          duration: 3000,
        });
      } else {
        // Create new promo
        const response = await fetch('/api/promo-vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(promoData),
        });

        if (!response.ok) throw new Error('Erreur lors de la création');

        toast({
          title: 'Promo ajoutée',
          status: 'success',
          duration: 3000,
        });
      }

      resetForm();
      onClose();
      fetchPromos(); // Recharger la liste
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de sauvegarder la promo',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleEdit = (promo: any) => {
    setEditingPromo(promo);
    setName(promo.name);
    setPrice(promo.price.toString());
    setOldPrice(promo.oldPrice.toString());
    setImagePreview(promo.image);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette promo?')) return;

    try {
      const response = await fetch(`/api/promo-vehicles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      toast({
        title: 'Promo supprimée',
        status: 'info',
        duration: 3000,
      });

      fetchPromos(); // Recharger la liste
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la promo',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const resetForm = () => {
    setEditingPromo(null);
    setName('');
    setPrice('');
    setOldPrice('');
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="xl">Voitures Promotionnelles</Heading>
            <Text color="gray.600">
              Gérez les voitures affichées en carousel sur la page d&apos;accueil
            </Text>
          </Box>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="brand"
            onClick={() => {
              resetForm();
              onOpen();
            }}
          >
            Ajouter une promo
          </Button>
        </HStack>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Icon as={FiImage} color="brand.500" boxSize={5} />
                <Text fontWeight="semibold">
                  Images recommandées: PNG sans fond, 1200x600px
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Les voitures s&apos;affichent automatiquement en carousel toutes les 10 secondes
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {promos.map((promo) => (
            <Card key={promo.id}>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Box position="relative" h="200px" bg="gray.100" borderRadius="lg" overflow="hidden">
                    <Image
                      src={promo.image}
                      alt={promo.name}
                      objectFit="contain"
                      w="full"
                      h="full"
                    />
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme={promo.active ? 'green' : 'gray'}
                    >
                      {promo.active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </Box>

                  <Heading size="md">{promo.name}</Heading>

                  <HStack justify="space-between">
                    <VStack align="start" spacing={0}>
                      <Text fontSize="2xl" fontWeight="bold" color="red.500">
                        {promo.price}$ /jour
                      </Text>
                      <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                        {promo.oldPrice}$
                      </Text>
                    </VStack>
                    <Badge colorScheme="red" fontSize="sm">
                      -{Math.round((1 - promo.price / promo.oldPrice) * 100)}%
                    </Badge>
                  </HStack>

                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Modifier"
                      icon={<Icon as={FiEdit2} />}
                      onClick={() => handleEdit(promo)}
                      flex={1}
                    />
                    <IconButton
                      aria-label="Supprimer"
                      icon={<Icon as={FiTrash2} />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleDelete(promo.id)}
                      flex={1}
                    />
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Modal Ajouter/Modifier */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingPromo ? 'Modifier la promo' : 'Ajouter une promo'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nom du véhicule</FormLabel>
                <Input
                  placeholder="Ex: Tesla Model 3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Prix promo ($/jour)</FormLabel>
                  <Input
                    type="number"
                    placeholder="99.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Ancien prix ($/jour)</FormLabel>
                  <Input
                    type="number"
                    placeholder="119.99"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Image (PNG sans fond recommandé)</FormLabel>
                <Box
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor="gray.300"
                  borderRadius="lg"
                  p={6}
                  cursor="pointer"
                  onClick={() => fileInputRef.current?.click()}
                  bg={imagePreview ? 'transparent' : 'gray.50'}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      maxH="200px"
                      objectFit="contain"
                      mx="auto"
                    />
                  ) : (
                    <VStack>
                      <Icon as={FiUpload} boxSize={12} color="gray.400" />
                      <Text color="gray.600">Cliquez pour uploader</Text>
                      <Text fontSize="sm" color="gray.500">
                        PNG, JPG (1200x600px recommandé)
                      </Text>
                    </VStack>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleSubmit}
              isDisabled={!name || !price || !oldPrice}
            >
              {editingPromo ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
