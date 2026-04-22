'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Button,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Progress,
  Alert,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiTruck,
  FiFileText,
  FiUpload,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { UploadDocumentsModal } from '@/components/client/UploadDocumentsModal';
import { ReportProblemModal } from '@/components/client/ReportProblemModal';

export default function MyReservationsPage() {
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  // Données de test
  const reservations = [
    {
      id: 'RES-001',
      vehicle: 'Toyota Corolla 2024',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      totalPrice: 258.75,
      deposit: 500,
      status: 'UPCOMING',
      hasDriverLicense: true,
      hasIBAN: false,
      documentsProgress: 50,
    },
    {
      id: 'RES-002',
      vehicle: 'Ford F-150 2024',
      startDate: '2025-01-10',
      endDate: '2025-01-14',
      totalPrice: 475,
      deposit: 800,
      status: 'ACTIVE',
      hasDriverLicense: true,
      hasIBAN: true,
      documentsProgress: 100,
    },
    {
      id: 'RES-003',
      vehicle: 'Tesla Model 3',
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      totalPrice: 600,
      deposit: 1000,
      status: 'COMPLETED',
      hasDriverLicense: true,
      hasIBAN: true,
      documentsProgress: 100,
    },
  ];

  const upcomingReservations = reservations.filter(r => r.status === 'UPCOMING');
  const activeReservations = reservations.filter(r => r.status === 'ACTIVE');
  const pastReservations = reservations.filter(r => r.status === 'COMPLETED');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'blue';
      case 'ACTIVE': return 'green';
      case 'COMPLETED': return 'gray';
      case 'CANCELLED': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      UPCOMING: 'À venir',
      ACTIVE: 'En cours',
      COMPLETED: 'Terminée',
      CANCELLED: 'Annulée',
    };
    return labels[status] || status;
  };

  const openUploadDocuments = (reservation: any) => {
    setSelectedReservation(reservation);
    onUploadOpen();
  };

  const openReportProblem = (reservation: any) => {
    setSelectedReservation(reservation);
    onReportOpen();
  };

  const ReservationCard = ({ reservation }: { reservation: any }) => (
    <Card className="glass">
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Text fontSize="sm" color="gray.600">
                {reservation.id}
              </Text>
              <Heading size="md">{reservation.vehicle}</Heading>
            </Box>
            <Badge colorScheme={getStatusColor(reservation.status)} fontSize="md">
              {getStatusLabel(reservation.status)}
            </Badge>
          </HStack>

          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Départ
              </Text>
              <HStack>
                <Icon as={FiCalendar} color="brand.500" />
                <Text fontWeight="semibold">
                  {format(new Date(reservation.startDate), 'd MMM yyyy', { locale: fr })}
                </Text>
              </HStack>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Retour
              </Text>
              <HStack>
                <Icon as={FiCalendar} color="brand.500" />
                <Text fontWeight="semibold">
                  {format(new Date(reservation.endDate), 'd MMM yyyy', { locale: fr })}
                </Text>
              </HStack>
            </Box>
          </SimpleGrid>

          {reservation.status === 'UPCOMING' && (
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="semibold">
                  Documents requis
                </Text>
                <Text fontSize="sm" color="brand.600">
                  {reservation.documentsProgress}%
                </Text>
              </HStack>
              <Progress
                value={reservation.documentsProgress}
                colorScheme={reservation.documentsProgress === 100 ? 'green' : 'brand'}
                size="sm"
                borderRadius="full"
              />
              <HStack mt={2} spacing={2}>
                <Badge colorScheme={reservation.hasDriverLicense ? 'green' : 'red'} fontSize="xs">
                  <Icon as={reservation.hasDriverLicense ? FiCheckCircle : FiXCircle} mr={1} />
                  Permis
                </Badge>
                <Badge colorScheme={reservation.hasIBAN ? 'green' : 'red'} fontSize="xs">
                  <Icon as={reservation.hasIBAN ? FiCheckCircle : FiXCircle} mr={1} />
                  RIB/IBAN
                </Badge>
              </HStack>
            </Box>
          )}

          <HStack justify="space-between" pt={2} borderTop="1px" borderColor="gray.200">
            <Box>
              <Text fontSize="sm" color="gray.600">
                Total
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                {reservation.totalPrice}$
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Caution
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {reservation.deposit}$
              </Text>
            </Box>
          </HStack>

          <SimpleGrid columns={2} spacing={2}>
            {reservation.status === 'UPCOMING' && reservation.documentsProgress < 100 && (
              <Button
                size="sm"
                colorScheme="brand"
                leftIcon={<Icon as={FiUpload} />}
                onClick={() => openUploadDocuments(reservation)}
              >
                Upload Documents
              </Button>
            )}
            {(reservation.status === 'UPCOMING' || reservation.status === 'ACTIVE') && (
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Icon as={FiAlertCircle} />}
                onClick={() => openReportProblem(reservation)}
              >
                Signaler un problème
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<Icon as={FiFileText} />}
            >
              Voir les détails
            </Button>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2}>
            Mes Réservations
          </Heading>
          <Text color="gray.600">
            Gérez vos locations et uploadez vos documents
          </Text>
        </Box>

        <Tabs variant="soft-rounded" colorScheme="brand">
          <TabList>
            <Tab>À venir ({upcomingReservations.length})</Tab>
            <Tab>En cours ({activeReservations.length})</Tab>
            <Tab>Historique ({pastReservations.length})</Tab>
          </TabList>

          <TabPanels>
            {/* À venir */}
            <TabPanel px={0}>
              {upcomingReservations.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {upcomingReservations.map(reservation => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </SimpleGrid>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Aucune réservation à venir
                </Alert>
              )}
            </TabPanel>

            {/* En cours */}
            <TabPanel px={0}>
              {activeReservations.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {activeReservations.map(reservation => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </SimpleGrid>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Aucune location en cours
                </Alert>
              )}
            </TabPanel>

            {/* Historique */}
            <TabPanel px={0}>
              {pastReservations.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {pastReservations.map(reservation => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </SimpleGrid>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Aucune location passée
                </Alert>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Upload Documents Modal */}
      {selectedReservation && (
        <UploadDocumentsModal
          isOpen={isUploadOpen}
          onClose={onUploadClose}
          reservation={selectedReservation}
        />
      )}

      {/* Report Problem Modal */}
      {selectedReservation && (
        <ReportProblemModal
          isOpen={isReportOpen}
          onClose={onReportClose}
          reservation={selectedReservation}
        />
      )}
    </Container>
  );
}
