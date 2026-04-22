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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Select,
  Input,
} from '@chakra-ui/react';
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiEye,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { InspectionReportModal } from '@/components/admin/InspectionReportModal';

export default function InspectionsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInspection, setSelectedInspection] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchInspections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, statusFilter]);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (typeFilter) params.append('type', typeFilter);
      if (statusFilter) params.append('validated', statusFilter);

      const response = await fetch(`/api/inspections?${params.toString()}`);
      const data = await response.json();
      setInspections(data);
    } catch (error) {
      console.error('Erreur chargement inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  const openInspectionDetails = (inspection: any) => {
    setSelectedInspection(inspection);
    onOpen();
  };

  const stats = [
    {
      label: 'Total Inspections',
      value: inspections.length,
      icon: FiFileText,
      color: 'blue',
    },
    {
      label: 'En attente',
      value: inspections.filter((i) => !i.validated).length,
      icon: FiClock,
      color: 'yellow',
    },
    {
      label: 'Validées',
      value: inspections.filter((i) => i.validated).length,
      icon: FiCheckCircle,
      color: 'green',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="xl">Inspections Digitales</Heading>
            <Text color="gray.600">
              Liste complète des inspections de départ et retour
            </Text>
          </Box>
        </HStack>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardBody>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      {stat.label}
                    </Text>
                    <Heading size="lg" color={`${stat.color}.500`}>
                      {stat.value}
                    </Heading>
                  </VStack>
                  <Icon as={stat.icon} boxSize={8} color={`${stat.color}.500`} />
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Filtres */}
        <Card>
          <CardBody>
            <HStack spacing={4}>
              <Select
                placeholder="Tous les types"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                maxW="250px"
              >
                <option value="DEPARTURE">Départ</option>
                <option value="RETURN">Retour</option>
              </Select>

              <Select
                placeholder="Tous les statuts"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                maxW="250px"
              >
                <option value="false">En attente</option>
                <option value="true">Validées</option>
              </Select>

              <Button onClick={fetchInspections} colorScheme="brand">
                Rafraîchir
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Table */}
        <Card>
          <CardBody>
            {loading ? (
              <Text textAlign="center" py={8} color="gray.500">
                Chargement...
              </Text>
            ) : inspections.length === 0 ? (
              <Text textAlign="center" py={8} color="gray.500">
                Aucune inspection trouvée
              </Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Client</Th>
                    <Th>Véhicule</Th>
                    <Th>Date</Th>
                    <Th>Kilométrage</Th>
                    <Th>Carburant</Th>
                    <Th>Photos</Th>
                    <Th>Statut</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inspections.map((inspection) => (
                    <Tr key={inspection.id}>
                      <Td>
                        <Badge
                          colorScheme={
                            inspection.type === 'DEPARTURE' ? 'green' : 'blue'
                          }
                        >
                          {inspection.type === 'DEPARTURE' ? 'Départ' : 'Retour'}
                        </Badge>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">
                            {inspection.reservation?.user?.name || 'N/A'}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {inspection.reservation?.user?.email || ''}
                          </Text>
                        </VStack>
                      </Td>
                      <Td fontSize="sm">
                        {inspection.vehicle?.brand} {inspection.vehicle?.model}
                      </Td>
                      <Td fontSize="sm">
                        {format(
                          new Date(inspection.createdAt),
                          'dd MMM yyyy HH:mm',
                          { locale: fr }
                        )}
                      </Td>
                      <Td fontSize="sm">{inspection.mileage.toLocaleString()} km</Td>
                      <Td fontSize="sm">{inspection.fuelLevel}%</Td>
                      <Td>
                        <Badge colorScheme="purple">
                          {inspection.photos?.length || 0} photos
                        </Badge>
                      </Td>
                      <Td>
                        {inspection.validated ? (
                          <Badge colorScheme="green">
                            <Icon as={FiCheckCircle} mr={1} />
                            Validée
                          </Badge>
                        ) : (
                          <Badge colorScheme="yellow">
                            <Icon as={FiClock} mr={1} />
                            En attente
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          leftIcon={<Icon as={FiEye} />}
                          onClick={() => openInspectionDetails(inspection)}
                        >
                          Voir
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Modal détails inspection */}
      {selectedInspection && (
        <InspectionReportModal
          isOpen={isOpen}
          onClose={onClose}
          inspection={selectedInspection}
          onValidate={fetchInspections}
        />
      )}
    </Container>
  );
}
