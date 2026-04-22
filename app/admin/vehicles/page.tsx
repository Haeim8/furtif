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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiSearch,
  FiEye,
} from 'react-icons/fi';
import Link from 'next/link';
import { AddVehicleModal } from '@/components/admin/AddVehicleModal';
import { useState, useEffect } from 'react';

export default function VehiclesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/vehicles?${params.toString()}`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Erreur chargement véhicules:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les véhicules',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Véhicule supprimé',
          status: 'success',
          duration: 3000,
        });
        fetchVehicles();
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le véhicule',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'green';
      case 'RESERVED':
        return 'blue';
      case 'RENTED':
        return 'orange';
      case 'MAINTENANCE':
        return 'red';
      case 'UNAVAILABLE':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      SEDAN: 'Berline',
      SUV: 'SUV',
      PICKUP: 'Pick-up',
      VAN: 'Fourgonnette',
      SPORT: 'Sport',
      LUXURY: 'Luxe',
      ELECTRIC: 'Électrique',
    };
    return labels[type] || type;
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between">
        <Box>
          <Heading size="lg" mb={2}>
            Gestion des Véhicules
          </Heading>
          <Text color="gray.600">
            Gérez votre flotte de véhicules
          </Text>
        </Box>
        <Button
          leftIcon={<Icon as={FiPlus} />}
          colorScheme="brand"
          size="lg"
          onClick={onOpen}
        >
          Ajouter un Véhicule
        </Button>
      </HStack>

      {/* Filters */}
      <Card className="glass">
        <CardBody>
          <HStack spacing={4}>
            <InputGroup maxW="400px">
              <InputLeftElement>
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Rechercher un véhicule..." />
            </InputGroup>
            <Select placeholder="Type de véhicule" maxW="200px">
              <option value="SEDAN">Berline</option>
              <option value="SUV">SUV</option>
              <option value="PICKUP">Pick-up</option>
              <option value="VAN">Fourgonnette</option>
              <option value="ELECTRIC">Électrique</option>
            </Select>
            <Select placeholder="Statut" maxW="200px">
              <option value="AVAILABLE">Disponible</option>
              <option value="RESERVED">Réservé</option>
              <option value="RENTED">Loué</option>
              <option value="MAINTENANCE">Maintenance</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Vehicles Table */}
      <Card className="glass">
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Véhicule</Th>
                <Th>Type</Th>
                <Th>Plaque</Th>
                <Th>Prix/Jour</Th>
                <Th>Statut</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {vehicles.map((vehicle) => (
                <Tr key={vehicle.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Box
                        w="60px"
                        h="40px"
                        borderRadius="md"
                        bg="gray.100"
                        overflow="hidden"
                      >
                        {/* Placeholder for vehicle image */}
                        <Box w="full" h="full" bg="gray.200" />
                      </Box>
                      <Box>
                        <Text fontWeight="semibold">
                          {vehicle.brand} {vehicle.model}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {vehicle.year}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">
                      {getTypeLabel(vehicle.type)}
                    </Badge>
                  </Td>
                  <Td fontWeight="mono">{vehicle.licensePlate}</Td>
                  <Td fontWeight="semibold" color="brand.600">
                    {vehicle.pricePerDay}$ / jour
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Link href={`/admin/vehicles/${vehicle.id}`}>
                        <IconButton
                          aria-label="Voir"
                          icon={<Icon as={FiEye} />}
                          size="sm"
                          variant="ghost"
                        />
                      </Link>
                      <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                        <IconButton
                          aria-label="Modifier"
                          icon={<Icon as={FiEdit} />}
                          size="sm"
                          variant="ghost"
                        />
                      </Link>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<Icon as={FiMoreVertical} />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem color="red.500" icon={<Icon as={FiTrash2} />}>
                            Supprimer
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

      {/* Stats Summary */}
      <HStack spacing={4}>
        <Card className="glass" flex="1">
          <CardBody>
            <Text fontSize="sm" color="gray.600">
              Total Véhicules
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {vehicles.length}
            </Text>
          </CardBody>
        </Card>
        <Card className="glass" flex="1">
          <CardBody>
            <Text fontSize="sm" color="gray.600">
              Disponibles
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {vehicles.filter((v) => v.status === 'AVAILABLE').length}
            </Text>
          </CardBody>
        </Card>
        <Card className="glass" flex="1">
          <CardBody>
            <Text fontSize="sm" color="gray.600">
              En Location
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {vehicles.filter((v) => v.status === 'RENTED').length}
            </Text>
          </CardBody>
        </Card>
      </HStack>

      {/* Add Vehicle Modal */}
      <AddVehicleModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
