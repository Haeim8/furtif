'use client';

import {
  Box,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  VStack,
  HStack,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiTruck,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiFileText,
  FiXCircle,
} from 'react-icons/fi';
import { format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { InspectionModal } from '@/components/admin/InspectionModal';
import { ValidateDocumentsModal } from '@/components/admin/ValidateDocumentsModal';

export default function AdminDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDocsOpen,
    onOpen: onDocsOpen,
    onClose: onDocsClose
  } = useDisclosure();
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [inspectionType, setInspectionType] = useState<'DEPARTURE' | 'RETURN'>('DEPARTURE');
  const [reservationToValidate, setReservationToValidate] = useState<any>(null);

  const today = format(new Date(), 'yyyy-MM-dd');

  // Données de test - À remplacer par vraies données de la BDD
  const stats = [
    {
      label: 'Véhicules Disponibles',
      value: '12',
      total: '20',
      icon: FiTruck,
      color: 'green',
    },
    {
      label: 'Véhicules Indisponibles',
      value: '8',
      total: '20',
      icon: FiXCircle,
      color: 'red',
    },
    {
      label: 'Départs Aujourd\'hui',
      value: '3',
      icon: FiCalendar,
      color: 'blue',
    },
    {
      label: 'Retours Aujourd\'hui',
      value: '2',
      icon: FiCalendar,
      color: 'orange',
    },
    {
      label: 'Revenus du Mois',
      value: '45,230$',
      change: '+12%',
      icon: FiDollarSign,
      color: 'purple',
    },
    {
      label: 'Nouveaux Clients',
      value: '24',
      change: '+8',
      icon: FiUsers,
      color: 'teal',
    },
  ];

  // Voitures indisponibles (en location)
  const unavailableVehicles = [
    {
      id: 'VEH-001',
      name: 'Toyota Corolla 2024',
      client: 'Jean Dupont',
      returnDate: '2025-01-16',
    },
    {
      id: 'VEH-002',
      name: 'Ford F-150 2024',
      client: 'Marie Martin',
      returnDate: '2025-01-20',
    },
    {
      id: 'VEH-003',
      name: 'Tesla Model 3',
      client: 'Pierre Leblanc',
      returnDate: today,
    },
  ];

  // Départs aujourd'hui
  const departuresThisDay = [
    {
      id: 'RES-001',
      client: 'Jean Dupont',
      clientEmail: 'jean.dupont@example.com',
      vehicle: 'Toyota Corolla 2024',
      startDate: today,
      endDate: '2025-01-16',
      hasDriverLicense: true,
      hasIBAN: true,
      hasInspection: false,
    },
    {
      id: 'RES-002',
      client: 'Marie Martin',
      clientEmail: 'marie.martin@example.com',
      vehicle: 'Ford F-150 2024',
      startDate: today,
      endDate: '2025-01-20',
      hasDriverLicense: true,
      hasIBAN: false,
      hasInspection: false,
    },
    {
      id: 'RES-004',
      client: 'Sophie Tremblay',
      clientEmail: 'sophie.t@example.com',
      vehicle: 'Honda Civic 2024',
      startDate: today,
      endDate: '2025-01-18',
      hasDriverLicense: false,
      hasIBAN: true,
      hasInspection: false,
    },
  ];

  // Retours aujourd'hui
  const returnsThisDay = [
    {
      id: 'RES-003',
      client: 'Pierre Leblanc',
      vehicle: 'Tesla Model 3',
      startDate: '2025-01-10',
      endDate: today,
      hasInspection: true,
      deposit: 1000,
    },
    {
      id: 'RES-005',
      client: 'Luc Gagnon',
      vehicle: 'Mazda CX-5 2024',
      startDate: '2025-01-08',
      endDate: today,
      hasInspection: true,
      deposit: 750,
    },
  ];

  const openInspection = (reservation: any, type: 'DEPARTURE' | 'RETURN') => {
    setSelectedReservation(reservation);
    setInspectionType(type);
    onOpen();
  };

  const openValidateDocuments = (reservation: any) => {
    setReservationToValidate(reservation);
    onDocsOpen();
  };

  const handleDocumentsValidated = (hasDriverLicense: boolean, hasIBAN: boolean) => {
    // TODO: Mettre à jour en base de données
    console.log('Documents validés:', { hasDriverLicense, hasIBAN });
    // En production, faire une mutation pour mettre à jour la réservation
    // puis rafraîchir les données
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Dashboard - Vue d&apos;Ensemble
        </Heading>
        <Text color="gray.600">
          Gestion complète de votre agence de location
        </Text>
      </Box>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4}>
        {stats.map((stat) => (
          <Card key={stat.label} className="glass">
            <CardBody>
              <VStack spacing={2} align="start">
                <HStack spacing={2}>
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg={`${stat.color}.50`}
                    color={`${stat.color}.500`}
                  >
                    <Icon as={stat.icon} boxSize={5} />
                  </Box>
                </HStack>
                <Box w="full">
                  <Text fontSize="xs" color="gray.600" mb={1}>
                    {stat.label}
                  </Text>
                  <HStack justify="space-between" align="baseline">
                    <Text fontSize="2xl" fontWeight="bold">
                      {stat.value}
                    </Text>
                    {stat.total && (
                      <Text fontSize="sm" color="gray.500">
                        / {stat.total}
                      </Text>
                    )}
                  </HStack>
                  {stat.change && (
                    <Text fontSize="xs" color="green.500" mt={1}>
                      <Icon as={FiCheckCircle} boxSize={3} /> {stat.change}
                    </Text>
                  )}
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Départs Aujourd&apos;hui */}
      <Card className="glass">
        <CardBody>
          <Heading size="md" mb={4}>
            Départs Aujourd&apos;hui ({departuresThisDay.length})
          </Heading>
          {departuresThisDay.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Client</Th>
                  <Th>Véhicule</Th>
                  <Th>Documents</Th>
                  <Th>État</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {departuresThisDay.map((departure) => {
                  const hasAllDocuments = departure.hasDriverLicense && departure.hasIBAN;
                  return (
                    <Tr key={departure.id} bg="blue.50">
                      <Td fontWeight="semibold">{departure.id}</Td>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="semibold" fontSize="sm">{departure.client}</Text>
                          <Text fontSize="xs" color="gray.500">{departure.clientEmail}</Text>
                        </VStack>
                      </Td>
                      <Td fontSize="sm">{departure.vehicle}</Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <HStack spacing={1}>
                            <Icon
                              as={departure.hasDriverLicense ? FiCheckCircle : FiAlertCircle}
                              color={departure.hasDriverLicense ? 'green.500' : 'red.500'}
                              boxSize={3}
                            />
                            <Text fontSize="xs">
                              {departure.hasDriverLicense ? 'Permis OK' : 'Pas de permis'}
                            </Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon
                              as={departure.hasIBAN ? FiCheckCircle : FiAlertCircle}
                              color={departure.hasIBAN ? 'green.500' : 'red.500'}
                              boxSize={3}
                            />
                            <Text fontSize="xs">
                              {departure.hasIBAN ? 'RIB OK' : 'Pas de RIB'}
                            </Text>
                          </HStack>
                        </VStack>
                      </Td>
                      <Td>
                        {departure.hasInspection ? (
                          <Badge colorScheme="green" fontSize="xs">
                            <Icon as={FiCheckCircle} boxSize={3} mr={1} />
                            Inspection OK
                          </Badge>
                        ) : (
                          <Badge colorScheme="yellow" fontSize="xs">
                            <Icon as={FiClock} boxSize={3} mr={1} />
                            En attente
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        <VStack align="stretch" spacing={2}>
                          {!hasAllDocuments && (
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              leftIcon={<Icon as={FiAlertCircle} />}
                              onClick={() => openValidateDocuments(departure)}
                            >
                              Compléter Documents
                            </Button>
                          )}
                          <Button
                            size="sm"
                            colorScheme="brand"
                            leftIcon={<Icon as={FiFileText} />}
                            onClick={() => openInspection(departure, 'DEPARTURE')}
                            isDisabled={!hasAllDocuments}
                          >
                            Inspection Départ
                          </Button>
                        </VStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Aucun départ prévu aujourd&apos;hui
            </Text>
          )}
        </CardBody>
      </Card>

      {/* Retours Aujourd&apos;hui */}
      <Card className="glass">
        <CardBody>
          <Heading size="md" mb={4}>
            Retours Aujourd&apos;hui ({returnsThisDay.length})
          </Heading>
          {returnsThisDay.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Client</Th>
                  <Th>Véhicule</Th>
                  <Th>Caution</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {returnsThisDay.map((returnItem) => (
                  <Tr key={returnItem.id} bg="orange.50">
                    <Td fontWeight="semibold">{returnItem.id}</Td>
                    <Td>
                      <Text fontWeight="semibold" fontSize="sm">{returnItem.client}</Text>
                    </Td>
                    <Td fontSize="sm">{returnItem.vehicle}</Td>
                    <Td>
                      <Text fontWeight="semibold" color="green.600">
                        {returnItem.deposit}$
                      </Text>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        leftIcon={<Icon as={FiFileText} />}
                        onClick={() => openInspection(returnItem, 'RETURN')}
                      >
                        Inspection Retour
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Aucun retour prévu aujourd&apos;hui
            </Text>
          )}
        </CardBody>
      </Card>

      {/* Voitures Indisponibles */}
      <Card className="glass">
        <CardBody>
          <Heading size="md" mb={4}>
            Véhicules Indisponibles ({unavailableVehicles.length})
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Véhicule</Th>
                <Th>Client</Th>
                <Th>Retour Prévu</Th>
                <Th>Statut</Th>
              </Tr>
            </Thead>
            <Tbody>
              {unavailableVehicles.map((vehicle) => {
                const isReturnToday = vehicle.returnDate === today;
                return (
                  <Tr key={vehicle.id} bg={isReturnToday ? 'orange.50' : undefined}>
                    <Td fontWeight="semibold" fontSize="sm">{vehicle.id}</Td>
                    <Td fontSize="sm">{vehicle.name}</Td>
                    <Td fontSize="sm">{vehicle.client}</Td>
                    <Td fontSize="sm">
                      {format(new Date(vehicle.returnDate), 'd MMM yyyy', { locale: fr })}
                      {isReturnToday && (
                        <Badge ml={2} colorScheme="orange" fontSize="xs">
                          AUJOURD&apos;HUI
                        </Badge>
                      )}
                    </Td>
                    <Td>
                      <Badge colorScheme="red" fontSize="xs">
                        <Icon as={FiXCircle} boxSize={3} mr={1} />
                        En location
                      </Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Inspection Modal */}
      {selectedReservation && (
        <InspectionModal
          isOpen={isOpen}
          onClose={onClose}
          type={inspectionType}
          reservation={selectedReservation}
        />
      )}

      {/* Validate Documents Modal */}
      {reservationToValidate && (
        <ValidateDocumentsModal
          isOpen={isDocsOpen}
          onClose={onDocsClose}
          reservation={reservationToValidate}
          onValidate={handleDocumentsValidated}
        />
      )}
    </VStack>
  );
}
