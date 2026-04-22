'use client';

import {
  Box,
  Button,
  Heading,
  Text,
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
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiCheck,
  FiX,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiAlertCircle,
} from 'react-icons/fi';
import { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { InspectionModal } from '@/components/admin/InspectionModal';
import { ClientDetailsModal } from '@/components/admin/ClientDetailsModal';
import { ValidateDocumentsModal } from '@/components/admin/ValidateDocumentsModal';

export default function ReservationsPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { isOpen: isInspectionOpen, onOpen: onInspectionOpen, onClose: onInspectionClose } = useDisclosure();
  const { isOpen: isClientOpen, onOpen: onClientOpen, onClose: onClientClose } = useDisclosure();
  const { isOpen: isDocsOpen, onOpen: onDocsOpen, onClose: onDocsClose } = useDisclosure();
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [reservationToValidate, setReservationToValidate] = useState<any>(null);
  const [inspectionType, setInspectionType] = useState<'DEPARTURE' | 'RETURN'>('DEPARTURE');

  // Calcul de la semaine en cours
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Données de test - À remplacer par données de la BDD
  const today = format(new Date(), 'yyyy-MM-dd');

  const reservations = [
    {
      id: 'RES-001',
      client: 'Jean Dupont',
      clientEmail: 'jean.dupont@example.com',
      vehicle: 'Toyota Corolla 2024',
      startDate: today, // Départ aujourd'hui
      endDate: '2025-01-16',
      status: 'CONFIRMED',
      totalPrice: 225,
      deposit: 500,
      hasDriverLicense: true,
      hasIBAN: true,
      hasInspection: false,
    },
    {
      id: 'RES-002',
      client: 'Marie Martin',
      clientEmail: 'marie.martin@example.com',
      vehicle: 'Ford F-150 2024',
      startDate: today, // Départ aujourd'hui
      endDate: '2025-01-20',
      status: 'CONFIRMED',
      totalPrice: 665,
      deposit: 800,
      hasDriverLicense: true,
      hasIBAN: false, // Pas de RIB
      hasInspection: false,
    },
    {
      id: 'RES-003',
      client: 'Pierre Leblanc',
      clientEmail: 'pierre.leblanc@example.com',
      vehicle: 'Tesla Model 3',
      startDate: '2025-01-10',
      endDate: today, // Retour aujourd'hui
      status: 'ACTIVE',
      totalPrice: 480,
      deposit: 1000,
      hasDriverLicense: false, // Pas de permis
      hasIBAN: true,
      hasInspection: true, // A fait l&apos;inspection de départ
    },
  ];

  const openInspection = (reservation: any, type: 'DEPARTURE' | 'RETURN') => {
    setSelectedReservation(reservation);
    setInspectionType(type);
    onInspectionOpen();
  };

  const openValidateDocuments = (reservation: any) => {
    setReservationToValidate(reservation);
    onDocsOpen();
  };

  const handleDocumentsValidated = (hasDriverLicense: boolean, hasIBAN: boolean) => {
    // TODO: Mettre à jour en base de données
    console.log('Documents validés:', { hasDriverLicense, hasIBAN });
    // Rafraîchir les données
  };

  const openClientDetails = (reservation: any) => {
    // Enrichir les données de la réservation avec les infos client
    const clientData = {
      ...reservation,
      name: reservation.client,
      phone: '+1 514-555-0123',
      address: '123 Rue Principale, Montreal, QC',
      totalRentals: 3,
      totalSpent: 1250,
    };
    setSelectedReservation(clientData);
    onClientOpen();
  };

  // Réservations de départ cette semaine
  const departuresThisWeek = reservations.filter((r) => {
    const startDate = new Date(r.startDate);
    return startDate >= weekStart && startDate <= weekEnd;
  });

  // Réservations de retour cette semaine
  const returnsThisWeek = reservations.filter((r) => {
    const endDate = new Date(r.endDate);
    return endDate >= weekStart && endDate <= weekEnd;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'green';
      case 'PENDING':
        return 'yellow';
      case 'ACTIVE':
        return 'blue';
      case 'COMPLETED':
        return 'gray';
      case 'CANCELLED':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      CONFIRMED: 'Confirmée',
      PENDING: 'En attente',
      ACTIVE: 'En cours',
      COMPLETED: 'Terminée',
      CANCELLED: 'Annulée',
    };
    return labels[status] || status;
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Gestion des Réservations
        </Heading>
        <Text color="gray.600">
          Gérez les réservations, départs et retours de véhicules
        </Text>
      </Box>

      {/* Stats */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Réservations Totales
              </StatLabel>
              <StatNumber fontSize="2xl">{reservations.length}</StatNumber>
              <StatHelpText>Ce mois</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                En Attente
              </StatLabel>
              <StatNumber fontSize="2xl" color="yellow.500">
                {reservations.filter((r) => r.status === 'PENDING').length}
              </StatNumber>
              <StatHelpText>À valider</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                En cours
              </StatLabel>
              <StatNumber fontSize="2xl" color="blue.500">
                {reservations.filter((r) => r.status === 'ACTIVE').length}
              </StatNumber>
              <StatHelpText>Actives</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Revenus Semaine
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.500">
                {departuresThisWeek.reduce((sum, r) => sum + r.totalPrice, 0)}$
              </StatNumber>
              <StatHelpText>Cette semaine</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Weekly View */}
      <Card className="glass">
        <CardBody>
          <HStack justify="space-between" mb={4}>
            <HStack>
              <IconButton
                aria-label="Semaine précédente"
                icon={<Icon as={FiChevronLeft} />}
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                variant="ghost"
              />
              <Heading size="md">
                {format(weekStart, 'd MMM', { locale: fr })} -{' '}
                {format(weekEnd, 'd MMM yyyy', { locale: fr })}
              </Heading>
              <IconButton
                aria-label="Semaine suivante"
                icon={<Icon as={FiChevronRight} />}
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                variant="ghost"
              />
              <Button size="sm" onClick={() => setCurrentWeek(new Date())}>
                Aujourd&apos;hui
              </Button>
            </HStack>
          </HStack>

          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              <Tab>Départs ({departuresThisWeek.length})</Tab>
              <Tab>Retours ({returnsThisWeek.length})</Tab>
            </TabList>

            <TabPanels>
              {/* Départs */}
              <TabPanel>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Date Départ</Th>
                      <Th>Client</Th>
                      <Th>Véhicule</Th>
                      <Th>Documents</Th>
                      <Th>Durée</Th>
                      <Th>Montant</Th>
                      <Th>Statut</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {departuresThisWeek.map((reservation) => {
                      const duration =
                        Math.ceil(
                          (new Date(reservation.endDate).getTime() -
                            new Date(reservation.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + 1;
                      const isDepartureToday = isToday(new Date(reservation.startDate));
                      const hasAllDocuments = reservation.hasDriverLicense && reservation.hasIBAN;

                      return (
                        <Tr key={reservation.id} bg={isDepartureToday ? 'blue.50' : undefined}>
                          <Td fontWeight="semibold">
                            {reservation.id}
                            {isDepartureToday && (
                              <Badge ml={2} colorScheme="blue">AUJOURD&apos;HUI</Badge>
                            )}
                          </Td>
                          <Td>
                            {format(new Date(reservation.startDate), 'd MMM yyyy', {
                              locale: fr,
                            })}
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="semibold">{reservation.client}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {reservation.clientEmail}
                              </Text>
                            </Box>
                          </Td>
                          <Td>{reservation.vehicle}</Td>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <HStack spacing={1}>
                                <Icon
                                  as={reservation.hasDriverLicense ? FiCheck : FiAlertCircle}
                                  color={reservation.hasDriverLicense ? 'green.500' : 'red.500'}
                                />
                                <Text fontSize="sm">
                                  {reservation.hasDriverLicense ? 'Permis' : 'Pas de permis'}
                                </Text>
                              </HStack>
                              <HStack spacing={1}>
                                <Icon
                                  as={reservation.hasIBAN ? FiCheck : FiAlertCircle}
                                  color={reservation.hasIBAN ? 'green.500' : 'red.500'}
                                />
                                <Text fontSize="sm">
                                  {reservation.hasIBAN ? 'RIB' : 'Pas de RIB'}
                                </Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td>{duration} jours</Td>
                          <Td fontWeight="semibold" color="brand.600">
                            {reservation.totalPrice}$
                          </Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(reservation.status)}>
                              {getStatusLabel(reservation.status)}
                            </Badge>
                          </Td>
                          <Td>
                            <VStack spacing={1} align="stretch">
                              {isDepartureToday && !reservation.hasInspection && !hasAllDocuments && (
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  variant="outline"
                                  leftIcon={<Icon as={FiAlertCircle} />}
                                  onClick={() => openValidateDocuments(reservation)}
                                  w="full"
                                >
                                  Compléter Documents
                                </Button>
                              )}
                              {isDepartureToday && !reservation.hasInspection && (
                                <Button
                                  size="sm"
                                  colorScheme="brand"
                                  leftIcon={<Icon as={FiFileText} />}
                                  onClick={() => openInspection(reservation, 'DEPARTURE')}
                                  isDisabled={!hasAllDocuments}
                                  w="full"
                                >
                                  Commencer le Départ
                                </Button>
                              )}
                              <HStack spacing={1} justify="center">
                                <IconButton
                                  aria-label="Voir"
                                  icon={<Icon as={FiEye} />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openClientDetails(reservation)}
                                />
                                {reservation.status === 'PENDING' && (
                                  <>
                                    <IconButton
                                      aria-label="Confirmer"
                                      icon={<Icon as={FiCheck} />}
                                      size="sm"
                                      colorScheme="green"
                                      variant="ghost"
                                    />
                                    <IconButton
                                      aria-label="Refuser"
                                      icon={<Icon as={FiX} />}
                                      size="sm"
                                      colorScheme="red"
                                      variant="ghost"
                                    />
                                  </>
                                )}
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    icon={<Icon as={FiMoreVertical} />}
                                    size="sm"
                                    variant="ghost"
                                  />
                                  <MenuList>
                                    <MenuItem icon={<Icon as={FiEdit} />}>
                                      Modifier
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={FiFileText} />}>
                                      Marquer inspection complétée
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={FiCheck} />}>
                                      Marquer documents validés
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={FiX} />} color="red.500">
                                      Annuler réservation
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </HStack>
                            </VStack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TabPanel>

              {/* Retours */}
              <TabPanel>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Date Retour</Th>
                      <Th>Client</Th>
                      <Th>Véhicule</Th>
                      <Th>Caution</Th>
                      <Th>Statut</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {returnsThisWeek.map((reservation) => {
                      const isReturnToday = isToday(new Date(reservation.endDate));

                      return (
                        <Tr key={reservation.id} bg={isReturnToday ? 'orange.50' : undefined}>
                          <Td fontWeight="semibold">
                            {reservation.id}
                            {isReturnToday && (
                              <Badge ml={2} colorScheme="orange">AUJOURD&apos;HUI</Badge>
                            )}
                          </Td>
                          <Td>
                            {format(new Date(reservation.endDate), 'd MMM yyyy', {
                              locale: fr,
                            })}
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="semibold">{reservation.client}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {reservation.clientEmail}
                              </Text>
                            </Box>
                          </Td>
                          <Td>{reservation.vehicle}</Td>
                          <Td fontWeight="semibold">{reservation.deposit}$</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(reservation.status)}>
                              {getStatusLabel(reservation.status)}
                            </Badge>
                          </Td>
                          <Td>
                            <VStack spacing={1} align="stretch">
                              {isReturnToday && reservation.hasInspection && (
                                <Button
                                  size="sm"
                                  colorScheme="orange"
                                  leftIcon={<Icon as={FiFileText} />}
                                  onClick={() => openInspection(reservation, 'RETURN')}
                                  w="full"
                                >
                                  Inspection Retour
                                </Button>
                              )}
                              <HStack spacing={1} justify="center">
                                <IconButton
                                  aria-label="Voir"
                                  icon={<Icon as={FiEye} />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openClientDetails(reservation)}
                                />
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    icon={<Icon as={FiMoreVertical} />}
                                    size="sm"
                                    variant="ghost"
                                  />
                                  <MenuList>
                                    <MenuItem icon={<Icon as={FiEye} />}>
                                      Voir détails
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={FiFileText} />}>
                                      Marquer inspection retour complétée
                                    </MenuItem>
                                    <MenuItem icon={<Icon as={FiCheck} />}>
                                      Marquer caution remboursée
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </HStack>
                            </VStack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

      {/* Toutes les réservations */}
      <Card className="glass">
        <CardBody>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Toutes les Réservations</Heading>
            <HStack>
              <Select placeholder="Filtrer par statut" maxW="200px">
                <option value="PENDING">En attente</option>
                <option value="CONFIRMED">Confirmées</option>
                <option value="ACTIVE">En cours</option>
                <option value="COMPLETED">Terminées</option>
                <option value="CANCELLED">Annulées</option>
              </Select>
            </HStack>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Client</Th>
                <Th>Véhicule</Th>
                <Th>Départ</Th>
                <Th>Retour</Th>
                <Th>Montant</Th>
                <Th>Statut</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservations.map((reservation) => (
                <Tr key={reservation.id}>
                  <Td fontWeight="semibold">{reservation.id}</Td>
                  <Td>
                    <Box>
                      <Text fontWeight="semibold">{reservation.client}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {reservation.clientEmail}
                      </Text>
                    </Box>
                  </Td>
                  <Td>{reservation.vehicle}</Td>
                  <Td>
                    {format(new Date(reservation.startDate), 'd MMM yyyy', {
                      locale: fr,
                    })}
                  </Td>
                  <Td>
                    {format(new Date(reservation.endDate), 'd MMM yyyy', {
                      locale: fr,
                    })}
                  </Td>
                  <Td fontWeight="semibold" color="brand.600">
                    {reservation.totalPrice}$
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(reservation.status)}>
                      {getStatusLabel(reservation.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <IconButton
                        aria-label="Voir"
                        icon={<Icon as={FiEye} />}
                        size="sm"
                        variant="ghost"
                        onClick={() => openClientDetails(reservation)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<Icon as={FiMoreVertical} />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem icon={<Icon as={FiEye} />}>Voir détails</MenuItem>
                          <MenuItem icon={<Icon as={FiEdit} />}>Modifier</MenuItem>
                          <MenuItem icon={<Icon as={FiFileText} />}>
                            Gérer manuellement
                          </MenuItem>
                          <MenuItem icon={<Icon as={FiX} />} color="red.500">
                            Annuler
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Inspection Modal */}
      {selectedReservation && (
        <InspectionModal
          isOpen={isInspectionOpen}
          onClose={onInspectionClose}
          type={inspectionType}
          reservation={selectedReservation}
        />
      )}

      {/* Client Details Modal */}
      {selectedReservation && (
        <ClientDetailsModal
          isOpen={isClientOpen}
          onClose={onClientClose}
          client={selectedReservation}
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
