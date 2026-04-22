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
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Divider,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiCalendar,
  FiTruck,
} from 'react-icons/fi';
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { InspectionReportModal } from '@/components/admin/InspectionReportModal';

export default function ClientsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isInspectionOpen,
    onOpen: onInspectionOpen,
    onClose: onInspectionClose
  } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedInspection, setSelectedInspection] = useState<any>(null);
  const [inspectionType, setInspectionType] = useState<'DEPARTURE' | 'RETURN'>('DEPARTURE');
  const [selectedRental, setSelectedRental] = useState<any>(null);

  // Données de test avec historique complet
  const clients = [
    {
      id: 'CLI-001',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+1 514-555-0123',
      address: '123 Rue Principale, Montreal, QC H3A 1B1',
      hasDriverLicense: true,
      hasIBAN: true,
      totalRentals: 5,
      totalSpent: 2450,
      status: 'verified',
      createdAt: '2024-06-15',
      // Historique des locations
      rentals: [
        {
          id: 'RES-001',
          vehicle: 'Toyota Corolla 2024',
          startDate: '2024-06-20',
          endDate: '2024-06-25',
          totalPrice: 300,
          deposit: 500,
          status: 'COMPLETED',
          // Inspections
          departureInspection: {
            date: '2024-06-20',
            mileage: 45230,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Véhicule en excellent état',
          },
          returnInspection: {
            date: '2024-06-25',
            mileage: 45580,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Retour impeccable',
          },
        },
        {
          id: 'RES-015',
          vehicle: 'Honda Civic 2024',
          startDate: '2024-08-10',
          endDate: '2024-08-15',
          totalPrice: 350,
          deposit: 500,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-08-10',
            mileage: 32100,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'RAS',
          },
          returnInspection: {
            date: '2024-08-15',
            mileage: 32450,
            fuelLevel: 87.5,
            photos: 15,
            damages: [
              { type: 'Rayure', location: 'Portière avant gauche', severity: 'Mineure' },
            ],
            remarks: 'Petite rayure constatée',
          },
        },
        {
          id: 'RES-028',
          vehicle: 'Ford F-150 2024',
          startDate: '2024-10-05',
          endDate: '2024-10-12',
          totalPrice: 665,
          deposit: 800,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-10-05',
            mileage: 18900,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Véhicule neuf',
          },
          returnInspection: {
            date: '2024-10-12',
            mileage: 19350,
            fuelLevel: 75,
            photos: 15,
            damages: [],
            remarks: 'RAS',
          },
        },
        {
          id: 'RES-042',
          vehicle: 'Tesla Model 3',
          startDate: '2024-12-01',
          endDate: '2024-12-05',
          totalPrice: 480,
          deposit: 1000,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-12-01',
            mileage: 8200,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Batterie pleine',
          },
          returnInspection: {
            date: '2024-12-05',
            mileage: 8550,
            fuelLevel: 62.5,
            photos: 15,
            damages: [],
            remarks: 'Parfait état',
          },
        },
        {
          id: 'RES-055',
          vehicle: 'Mazda CX-5 2024',
          startDate: '2025-01-08',
          endDate: '2025-01-12',
          totalPrice: 405,
          deposit: 750,
          status: 'COMPLETED',
          departureInspection: {
            date: '2025-01-08',
            mileage: 12300,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'RAS',
          },
          returnInspection: {
            date: '2025-01-12',
            mileage: 12680,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Client exemplaire',
          },
        },
      ],
    },
    {
      id: 'CLI-002',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '+1 514-555-0456',
      address: '456 Avenue du Parc, Montreal, QC H2X 1Y8',
      hasDriverLicense: true,
      hasIBAN: false,
      totalRentals: 2,
      totalSpent: 890,
      status: 'pending',
      createdAt: '2024-08-20',
      rentals: [
        {
          id: 'RES-018',
          vehicle: 'Nissan Altima 2024',
          startDate: '2024-09-01',
          endDate: '2024-09-05',
          totalPrice: 320,
          deposit: 500,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-09-01',
            mileage: 25100,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'RAS',
          },
          returnInspection: {
            date: '2024-09-05',
            mileage: 25420,
            fuelLevel: 50,
            photos: 15,
            damages: [],
            remarks: 'OK',
          },
        },
        {
          id: 'RES-033',
          vehicle: 'Hyundai Elantra 2024',
          startDate: '2024-11-15',
          endDate: '2024-11-20',
          totalPrice: 325,
          deposit: 500,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-11-15',
            mileage: 15200,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Véhicule propre',
          },
          returnInspection: {
            date: '2024-11-20',
            mileage: 15550,
            fuelLevel: 87.5,
            photos: 15,
            damages: [],
            remarks: 'Retour OK',
          },
        },
      ],
    },
    {
      id: 'CLI-003',
      name: 'Pierre Leblanc',
      email: 'pierre.leblanc@example.com',
      phone: '+1 514-555-0789',
      address: '789 Boulevard Saint-Laurent, Montreal, QC H2Z 1J3',
      hasDriverLicense: false,
      hasIBAN: true,
      totalRentals: 1,
      totalSpent: 480,
      status: 'pending',
      createdAt: '2024-12-10',
      rentals: [
        {
          id: 'RES-048',
          vehicle: 'Volkswagen Jetta 2024',
          startDate: '2024-12-20',
          endDate: '2024-12-24',
          totalPrice: 280,
          deposit: 500,
          status: 'COMPLETED',
          departureInspection: {
            date: '2024-12-20',
            mileage: 9800,
            fuelLevel: 100,
            photos: 15,
            damages: [],
            remarks: 'Nickel',
          },
          returnInspection: {
            date: '2024-12-24',
            mileage: 10150,
            fuelLevel: 75,
            photos: 15,
            damages: [],
            remarks: 'RAS',
          },
        },
      ],
    },
  ];

  const viewClientDetails = (client: any) => {
    setSelectedClient(client);
    onOpen();
  };

  const viewInspectionReport = (inspection: any, type: 'DEPARTURE' | 'RETURN', rental: any) => {
    setSelectedInspection(inspection);
    setInspectionType(type);
    setSelectedRental(rental);
    onInspectionOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'blocked':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      verified: 'Vérifié',
      pending: 'En attente',
      blocked: 'Bloqué',
    };
    return labels[status] || status;
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Gestion des Clients
        </Heading>
        <Text color="gray.600">
          Historique complet et rapports d&apos;inspection
        </Text>
      </Box>

      {/* Stats */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Total Clients
              </StatLabel>
              <StatNumber fontSize="2xl">{clients.length}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Clients Vérifiés
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.500">
                {clients.filter((c) => c.status === 'verified').length}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Total Locations
              </StatLabel>
              <StatNumber fontSize="2xl" color="blue.500">
                {clients.reduce((sum, c) => sum + c.totalRentals, 0)}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Revenus Total
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.600">
                {clients.reduce((sum, c) => sum + c.totalSpent, 0)}$
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Search */}
      <Card className="glass">
        <CardBody>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input placeholder="Rechercher un client..." />
          </InputGroup>
        </CardBody>
      </Card>

      {/* Clients List */}
      <Card className="glass">
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Client</Th>
                <Th>Contact</Th>
                <Th>Documents</Th>
                <Th>Locations</Th>
                <Th>Total Dépensé</Th>
                <Th>Statut</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client) => (
                <Tr key={client.id}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={client.name} />
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm">
                          {client.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {client.id}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="xs">{client.email}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {client.phone}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Icon
                        as={client.hasDriverLicense ? FiCheckCircle : FiXCircle}
                        color={client.hasDriverLicense ? 'green.500' : 'red.500'}
                        boxSize={4}
                      />
                      <Icon
                        as={client.hasIBAN ? FiCheckCircle : FiXCircle}
                        color={client.hasIBAN ? 'green.500' : 'red.500'}
                        boxSize={4}
                      />
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">{client.totalRentals}</Badge>
                  </Td>
                  <Td fontWeight="bold" color="green.600">
                    {client.totalSpent}$
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(client.status)} fontSize="xs">
                      {getStatusLabel(client.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Voir détails"
                      icon={<Icon as={FiEye} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => viewClientDetails(client)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Client Details Modal */}
      {selectedClient && (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent className="glass" maxH="90vh">
            <ModalHeader>
              <HStack spacing={4}>
                <Avatar size="lg" name={selectedClient.name} />
                <Box>
                  <Heading size="md">{selectedClient.name}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {selectedClient.id} • {selectedClient.totalRentals} locations • {selectedClient.totalSpent}$ dépensés
                  </Text>
                </Box>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Tabs variant="soft-rounded" colorScheme="brand">
                <TabList>
                  <Tab>Informations</Tab>
                  <Tab>Historique ({selectedClient.rentals.length})</Tab>
                  <Tab>Rapports d&apos;Inspection</Tab>
                </TabList>

                <TabPanels>
                  {/* Onglet Informations */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <Box>
                        <Heading size="sm" mb={3}>
                          Contact
                        </Heading>
                        <SimpleGrid columns={2} spacing={4}>
                          <HStack>
                            <Icon as={FiMail} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Email
                              </Text>
                              <Text fontSize="sm">{selectedClient.email}</Text>
                            </Box>
                          </HStack>
                          <HStack>
                            <Icon as={FiPhone} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Téléphone
                              </Text>
                              <Text fontSize="sm">{selectedClient.phone}</Text>
                            </Box>
                          </HStack>
                          <HStack gridColumn="span 2">
                            <Icon as={FiMapPin} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Adresse
                              </Text>
                              <Text fontSize="sm">{selectedClient.address}</Text>
                            </Box>
                          </HStack>
                        </SimpleGrid>
                      </Box>

                      <Divider />

                      <Box>
                        <Heading size="sm" mb={3}>
                          Documents
                        </Heading>
                        <SimpleGrid columns={2} spacing={4}>
                          <HStack spacing={3}>
                            <Icon
                              as={selectedClient.hasDriverLicense ? FiCheckCircle : FiXCircle}
                              color={selectedClient.hasDriverLicense ? 'green.500' : 'red.500'}
                              boxSize={5}
                            />
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold">
                                Permis de Conduire
                              </Text>
                              <Badge colorScheme={selectedClient.hasDriverLicense ? 'green' : 'red'} fontSize="xs">
                                {selectedClient.hasDriverLicense ? 'Vérifié' : 'Non vérifié'}
                              </Badge>
                            </Box>
                          </HStack>
                          <HStack spacing={3}>
                            <Icon
                              as={selectedClient.hasIBAN ? FiCheckCircle : FiXCircle}
                              color={selectedClient.hasIBAN ? 'green.500' : 'red.500'}
                              boxSize={5}
                            />
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold">
                                RIB / IBAN
                              </Text>
                              <Badge colorScheme={selectedClient.hasIBAN ? 'green' : 'red'} fontSize="xs">
                                {selectedClient.hasIBAN ? 'Vérifié' : 'Non vérifié'}
                              </Badge>
                            </Box>
                          </HStack>
                        </SimpleGrid>
                      </Box>
                    </VStack>
                  </TabPanel>

                  {/* Onglet Historique */}
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      {selectedClient.rentals.map((rental: any) => (
                        <Card key={rental.id} className="glass">
                          <CardBody>
                            <HStack justify="space-between" mb={3}>
                              <HStack>
                                <Icon as={FiTruck} color="brand.500" />
                                <Box>
                                  <Text fontWeight="bold">{rental.vehicle}</Text>
                                  <Text fontSize="xs" color="gray.500">
                                    {rental.id}
                                  </Text>
                                </Box>
                              </HStack>
                              <Badge colorScheme="green">{rental.status}</Badge>
                            </HStack>
                            <SimpleGrid columns={4} spacing={4}>
                              <Box>
                                <Text fontSize="xs" color="gray.500">
                                  Période
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold">
                                  {format(new Date(rental.startDate), 'd MMM', { locale: fr })} - {format(new Date(rental.endDate), 'd MMM yyyy', { locale: fr })}
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.500">
                                  Montant
                                </Text>
                                <Text fontSize="sm" fontWeight="bold" color="green.600">
                                  {rental.totalPrice}$
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.500">
                                  Caution
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold">
                                  {rental.deposit}$
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.500">
                                  Inspections
                                </Text>
                                <HStack>
                                  <Badge
                                    colorScheme="blue"
                                    fontSize="xs"
                                    cursor="pointer"
                                    onClick={() => viewInspectionReport(rental.departureInspection, 'DEPARTURE', rental)}
                                    _hover={{ opacity: 0.8 }}
                                  >
                                    <Icon as={FiEye} mr={1} /> Départ
                                  </Badge>
                                  <Badge
                                    colorScheme="orange"
                                    fontSize="xs"
                                    cursor="pointer"
                                    onClick={() => viewInspectionReport(rental.returnInspection, 'RETURN', rental)}
                                    _hover={{ opacity: 0.8 }}
                                  >
                                    <Icon as={FiEye} mr={1} /> Retour
                                  </Badge>
                                </HStack>
                              </Box>
                            </SimpleGrid>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Onglet Rapports d'Inspection */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      {selectedClient.rentals.map((rental: any) => (
                        <Box key={rental.id}>
                          <Heading size="sm" mb={3}>
                            {rental.vehicle} - {rental.id}
                          </Heading>
                          <SimpleGrid columns={2} spacing={4}>
                            {/* Inspection Départ */}
                            <Card bg="blue.50" borderColor="blue.200" borderWidth="1px">
                              <CardBody>
                                <HStack mb={3}>
                                  <Icon as={FiFileText} color="blue.600" boxSize={5} />
                                  <Heading size="xs" color="blue.700">
                                    Inspection Départ
                                  </Heading>
                                </HStack>
                                <VStack align="stretch" spacing={2}>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Date:</Text>
                                    <Text fontWeight="semibold">
                                      {format(new Date(rental.departureInspection.date), 'd MMM yyyy', { locale: fr })}
                                    </Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Kilométrage:</Text>
                                    <Text fontWeight="semibold">{rental.departureInspection.mileage} km</Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Carburant:</Text>
                                    <Text fontWeight="semibold">{rental.departureInspection.fuelLevel}%</Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Photos:</Text>
                                    <Badge colorScheme="blue">{rental.departureInspection.photos}</Badge>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Dommages:</Text>
                                    <Badge colorScheme={rental.departureInspection.damages.length === 0 ? 'green' : 'red'}>
                                      {rental.departureInspection.damages.length}
                                    </Badge>
                                  </HStack>
                                  <Box>
                                    <Text fontSize="xs" color="gray.600" mb={1}>
                                      Remarques:
                                    </Text>
                                    <Text fontSize="sm" fontStyle="italic">
                                      {rental.departureInspection.remarks}
                                    </Text>
                                  </Box>
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    leftIcon={<Icon as={FiEye} />}
                                    onClick={() => viewInspectionReport(rental.departureInspection, 'DEPARTURE', rental)}
                                    mt={2}
                                  >
                                    Voir le rapport complet
                                  </Button>
                                </VStack>
                              </CardBody>
                            </Card>

                            {/* Inspection Retour */}
                            <Card bg="orange.50" borderColor="orange.200" borderWidth="1px">
                              <CardBody>
                                <HStack mb={3}>
                                  <Icon as={FiFileText} color="orange.600" boxSize={5} />
                                  <Heading size="xs" color="orange.700">
                                    Inspection Retour
                                  </Heading>
                                </HStack>
                                <VStack align="stretch" spacing={2}>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Date:</Text>
                                    <Text fontWeight="semibold">
                                      {format(new Date(rental.returnInspection.date), 'd MMM yyyy', { locale: fr })}
                                    </Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Kilométrage:</Text>
                                    <Text fontWeight="semibold">{rental.returnInspection.mileage} km</Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Carburant:</Text>
                                    <Text fontWeight="semibold">{rental.returnInspection.fuelLevel}%</Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Photos:</Text>
                                    <Badge colorScheme="orange">{rental.returnInspection.photos}</Badge>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm">
                                    <Text color="gray.600">Dommages:</Text>
                                    <Badge colorScheme={rental.returnInspection.damages.length === 0 ? 'green' : 'red'}>
                                      {rental.returnInspection.damages.length}
                                    </Badge>
                                  </HStack>
                                  {rental.returnInspection.damages.length > 0 && (
                                    <Box bg="red.100" p={2} borderRadius="md">
                                      {rental.returnInspection.damages.map((damage: any, idx: number) => (
                                        <Text key={idx} fontSize="xs" color="red.800">
                                          • {damage.type} - {damage.location} ({damage.severity})
                                        </Text>
                                      ))}
                                    </Box>
                                  )}
                                  <Box>
                                    <Text fontSize="xs" color="gray.600" mb={1}>
                                      Remarques:
                                    </Text>
                                    <Text fontSize="sm" fontStyle="italic">
                                      {rental.returnInspection.remarks}
                                    </Text>
                                  </Box>
                                  <Button
                                    size="sm"
                                    colorScheme="orange"
                                    leftIcon={<Icon as={FiEye} />}
                                    onClick={() => viewInspectionReport(rental.returnInspection, 'RETURN', rental)}
                                    mt={2}
                                  >
                                    Voir le rapport complet
                                  </Button>
                                </VStack>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                          <Divider my={4} />
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Fermer
              </Button>
              <Button colorScheme="brand" leftIcon={<Icon as={FiMail} />}>
                Envoyer Email
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Inspection Report Modal */}
      <InspectionReportModal
        isOpen={isInspectionOpen}
        onClose={onInspectionClose}
        inspection={selectedInspection}
        type={inspectionType}
        reservation={selectedRental}
      />
    </VStack>
  );
}
