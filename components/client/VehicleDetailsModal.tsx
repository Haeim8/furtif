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
  Badge,
  SimpleGrid,
  Image,
  Divider,
  Heading,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiSettings,
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiTruck,
  FiZap,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { format, addDays, isSameDay, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface VehicleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
}

export function VehicleDetailsModal({
  isOpen,
  onClose,
  vehicle,
}: VehicleDetailsModalProps) {
  const cardBg = useColorModeValue('white', '#1a1a1a');
  const borderColor = useColorModeValue('gray.200', '#2a2a2a');
  const inputBg = useColorModeValue('gray.50', '#0a0a0a');
  const toast = useToast();
  const router = useRouter();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date }[]>([]);

  useEffect(() => {
    if (isOpen && vehicle?.rawData?.id) {
      fetchBookedDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, vehicle]);

  const fetchBookedDates = async () => {
    try {
      // Récupérer toutes les réservations pour ce véhicule
      const response = await fetch(`/api/reservations?vehicleId=${vehicle.rawData.id}`);
      if (!response.ok) return;

      const reservations = await response.json();

      // Filtrer les réservations confirmées ou actives
      const booked = reservations
        .filter((res: any) => ['CONFIRMED', 'ACTIVE'].includes(res.status))
        .map((res: any) => ({
          start: new Date(res.startDate),
          end: new Date(res.endDate),
        }));

      setBookedDates(booked);
    } catch (error) {
      console.error('Erreur chargement dates réservées:', error);
    }
  };

  // Générer les jours du mois pour le calendrier
  const getDaysInMonth = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Ajouter les jours vides au début
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Ajouter tous les jours du mois
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateBooked = (date: Date | null) => {
    if (!date) return false;
    return bookedDates.some(booking =>
      isWithinInterval(date, { start: booking.start, end: booking.end })
    );
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || isDateBooked(date)) return;

    const formattedDate = format(date, 'yyyy-MM-dd');

    if (selectingStart) {
      setStartDate(formattedDate);
      setEndDate('');
      setSelectingStart(false);
    } else {
      // Vérifier que la date de fin est après la date de début
      if (new Date(formattedDate) > new Date(startDate)) {
        setEndDate(formattedDate);
        setSelectingStart(true);
      } else {
        // Si la date cliquée est avant, réinitialiser et recommencer
        setStartDate(formattedDate);
        setEndDate('');
      }
    }
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * vehicle.price;
  };

  const handleReservation = async () => {
    if (!startDate || !endDate) {
      toast({
        title: 'Dates manquantes',
        description: 'Veuillez sélectionner les dates de début et de fin',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      // Pour l'instant, créer une réservation avec un userId temporaire
      // En production, il faudra récupérer l'ID de l'utilisateur connecté
      const userId = 'temp-user-' + Date.now();

      const totalPrice = calculateTotalPrice();
      const depositAmount = vehicle.rawData?.deposit || 500;

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          vehicleId: vehicle.rawData?.id || vehicle.id,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          totalPrice,
          depositPaid: depositAmount,
          manualBooking: true,
          notes: `Réservation depuis le site client - ${vehicle.name}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réservation');
      }

      toast({
        title: 'Réservation créée!',
        description: `Votre réservation pour ${vehicle.name} a été créée avec succès. Référence: ${data.id}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();

      // Rediriger vers une page de confirmation (à créer plus tard)
      // router.push(`/reservations/${data.id}`);
    } catch (error: any) {
      console.error('Erreur réservation:', error);
      toast({
        title: 'Erreur de réservation',
        description: error.message || 'Impossible de créer la réservation. Le véhicule est peut-être déjà réservé pour ces dates.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={cardBg}>
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <Heading size="lg">{vehicle.name} {vehicle.year}</Heading>
              <Badge colorScheme="brand" fontSize="md" px={3} py={1}>
                {vehicle.category}
              </Badge>
            </HStack>
            <HStack spacing={3}>
              <Badge bg="blackAlpha.700" color="white">
                ⭐ {vehicle.rating}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                {vehicle.trips} voyages complétés
              </Text>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Image Gallery */}
            <Box>
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                w="full"
                h="400px"
                objectFit="cover"
                borderRadius="xl"
              />
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Left Column - Details */}
              <VStack spacing={6} align="stretch">
                {/* Specs */}
                <Box>
                  <Heading size="md" mb={4}>Caractéristiques</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <HStack p={3} bg={inputBg} borderRadius="lg">
                      <Icon as={FiUsers} color="brand.500" boxSize={5} />
                      <Box>
                        <Text fontSize="sm" color="gray.600">Places</Text>
                        <Text fontWeight="semibold">{vehicle.seats}</Text>
                      </Box>
                    </HStack>
                    <HStack p={3} bg={inputBg} borderRadius="lg">
                      <Icon as={FiSettings} color="brand.500" boxSize={5} />
                      <Box>
                        <Text fontSize="sm" color="gray.600">Transmission</Text>
                        <Text fontWeight="semibold">{vehicle.transmission}</Text>
                      </Box>
                    </HStack>
                    <HStack p={3} bg={inputBg} borderRadius="lg">
                      <Icon as={FiZap} color="brand.500" boxSize={5} />
                      <Box>
                        <Text fontSize="sm" color="gray.600">Carburant</Text>
                        <Text fontWeight="semibold">{vehicle.fuel}</Text>
                      </Box>
                    </HStack>
                    <HStack p={3} bg={inputBg} borderRadius="lg">
                      <Icon as={FiTruck} color="brand.500" boxSize={5} />
                      <Box>
                        <Text fontSize="sm" color="gray.600">Catégorie</Text>
                        <Text fontWeight="semibold">{vehicle.category}</Text>
                      </Box>
                    </HStack>
                  </SimpleGrid>
                </Box>

                {/* Features */}
                <Box>
                  <Heading size="md" mb={4}>Équipements inclus</Heading>
                  <SimpleGrid columns={2} spacing={2}>
                    {[
                      'Climatisation',
                      'Bluetooth',
                      'GPS',
                      'Caméra de recul',
                      'Sièges chauffants',
                      'Apple CarPlay',
                      'USB',
                      'Régulateur de vitesse',
                    ].map((feature) => (
                      <HStack key={feature} spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" />
                        <Text fontSize="sm">{feature}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Pricing */}
                <Box p={4} bg={inputBg} borderRadius="xl">
                  <Heading size="md" mb={3}>Tarification</Heading>
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text color="gray.600">Prix par jour</Text>
                      <Text fontWeight="bold">{vehicle.price}$</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.600">Assurance incluse</Text>
                      <Icon as={FiCheckCircle} color="green.500" />
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.600">Kilométrage illimité</Text>
                      <Icon as={FiCheckCircle} color="green.500" />
                    </HStack>
                    <Divider my={2} />
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">Caution</Text>
                      <Text fontWeight="bold" color="orange.500">500$</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>

              {/* Right Column - Booking Calendar */}
              <VStack spacing={6} align="stretch">
                <Box p={5} borderRadius="xl" border="2px" borderColor="brand.500">
                  <Heading size="md" mb={4}>
                    <Icon as={FiCalendar} mr={2} />
                    Réserver ce véhicule
                  </Heading>

                  {/* Date Inputs */}
                  <VStack spacing={3} mb={4}>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiCalendar} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        placeholder="Date de début"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setEndDate('');
                          setSelectingStart(false);
                        }}
                        bg={inputBg}
                        border="none"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiCalendar} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        placeholder="Date de fin"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setSelectingStart(true);
                        }}
                        bg={inputBg}
                        border="none"
                      />
                    </InputGroup>
                    {selectingStart && !startDate && (
                      <Text fontSize="sm" color="brand.500">
                        📅 Sélectionnez la date de début
                      </Text>
                    )}
                    {!selectingStart && startDate && !endDate && (
                      <Text fontSize="sm" color="brand.500">
                        📅 Sélectionnez la date de retour
                      </Text>
                    )}
                  </VStack>

                  {/* Calendar */}
                  <Box>
                    <HStack justify="space-between" mb={3}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                      >
                        ←
                      </Button>
                      <Text fontWeight="semibold">
                        {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
                      </Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                      >
                        →
                      </Button>
                    </HStack>

                    {/* Days of week */}
                    <SimpleGrid columns={7} spacing={1} mb={2}>
                      {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                        <Text key={day} fontSize="xs" textAlign="center" color="gray.500" fontWeight="semibold">
                          {day}
                        </Text>
                      ))}
                    </SimpleGrid>

                    {/* Calendar Days */}
                    <SimpleGrid columns={7} spacing={1}>
                      {getDaysInMonth().map((date, index) => {
                        const isBooked = isDateBooked(date);
                        const isToday = date && isSameDay(date, new Date());
                        const isSelected = date && (
                          (startDate && isSameDay(date, new Date(startDate))) ||
                          (endDate && isSameDay(date, new Date(endDate)))
                        );

                        return (
                          <Box
                            key={index}
                            p={2}
                            textAlign="center"
                            fontSize="sm"
                            borderRadius="md"
                            cursor={date && !isBooked ? 'pointer' : 'not-allowed'}
                            onClick={() => handleDateClick(date)}
                            bg={
                              isBooked
                                ? 'red.500'
                                : isSelected
                                ? 'brand.500'
                                : 'transparent'
                            }
                            color={
                              isBooked || isSelected
                                ? 'white'
                                : isToday
                                ? 'brand.500'
                                : date
                                ? 'inherit'
                                : 'transparent'
                            }
                            fontWeight={isToday || isSelected ? 'bold' : 'normal'}
                            border={isToday ? '2px solid' : 'none'}
                            borderColor="brand.500"
                            _hover={
                              date && !isBooked
                                ? { bg: inputBg }
                                : {}
                            }
                            opacity={date ? 1 : 0}
                          >
                            {date ? format(date, 'd') : ''}
                          </Box>
                        );
                      })}
                    </SimpleGrid>

                    {/* Legend */}
                    <HStack spacing={4} mt={3} fontSize="xs">
                      <HStack>
                        <Box w={3} h={3} bg="red.500" borderRadius="sm" />
                        <Text>Réservé</Text>
                      </HStack>
                      <HStack>
                        <Box w={3} h={3} border="2px solid" borderColor="brand.500" borderRadius="sm" />
                        <Text>Aujourd&apos;hui</Text>
                      </HStack>
                    </HStack>
                  </Box>

                  {/* Total Price */}
                  {startDate && endDate && (
                    <Box mt={4} p={3} bg="brand.50" borderRadius="lg">
                      <HStack justify="space-between">
                        <Text fontWeight="semibold">Total</Text>
                        <VStack align="end" spacing={0}>
                          <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                            {calculateTotalPrice()}$
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            + 500$ caution
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  )}

                  <Button
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    mt={4}
                    isDisabled={!startDate || !endDate}
                    isLoading={loading}
                    onClick={handleReservation}
                  >
                    Réserver maintenant
                  </Button>
                </Box>

                {/* Info Box */}
                <Box p={4} bg="blue.50" borderRadius="lg" borderLeft="4px" borderColor="blue.400">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiShield} color="blue.600" />
                      <Text fontWeight="semibold" color="blue.800">
                        Réservation sécurisée
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="blue.700">
                      Annulation gratuite jusqu&apos;à 24h avant la prise en charge. Assurance complète incluse.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </SimpleGrid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
