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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Image,
  SimpleGrid,
  Select,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import {
  FiAlertCircle,
  FiEye,
  FiCheck,
  FiX,
  FiClock,
} from 'react-icons/fi';
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProblemsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [adminResponse, setAdminResponse] = useState('');

  // Données de test
  const problems = [
    {
      id: 'INC-001',
      type: 'ACCIDENT',
      subject: 'Accident mineur dans un parking',
      description:
        "J'ai eu un petit accident en reculant dans un parking. L'aile arrière droite a été endommagée. J'ai pris des photos et contacté la police locale.",
      userId: '1',
      userName: 'Jean Dupont',
      userEmail: 'jean.dupont@example.com',
      photos: ['/uploads/accident1.jpg', '/uploads/accident2.jpg'],
      status: 'OPEN',
      createdAt: '2025-01-09T14:30:00',
      adminResponse: null,
    },
    {
      id: 'INC-002',
      type: 'BREAKDOWN',
      subject: 'Problème de démarrage',
      description:
        'Le véhicule ne démarre plus. La batterie semble morte. Je suis actuellement au 123 Rue Principale, Montreal.',
      userId: '2',
      userName: 'Marie Martin',
      userEmail: 'marie.martin@example.com',
      photos: [],
      status: 'IN_PROGRESS',
      createdAt: '2025-01-10T09:15:00',
      adminResponse: 'Dépanneuse envoyée à votre position. ETA: 30 minutes.',
      respondedAt: '2025-01-10T09:20:00',
    },
    {
      id: 'INC-003',
      type: 'DAMAGE',
      subject: 'Rayure sur la portière',
      description:
        "J'ai remarqué une rayure sur la portière côté conducteur lors de l&apos;inspection de retour. Elle n'était pas là au départ.",
      userId: '3',
      userName: 'Pierre Leblanc',
      userEmail: 'pierre.leblanc@example.com',
      photos: ['/uploads/scratch1.jpg'],
      status: 'RESOLVED',
      createdAt: '2025-01-08T16:45:00',
      adminResponse:
        'Rayure confirmée. Coût de réparation: 150$. Caution utilisée pour couvrir les frais.',
      respondedAt: '2025-01-08T17:00:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'red';
      case 'IN_PROGRESS':
        return 'yellow';
      case 'RESOLVED':
        return 'green';
      case 'CLOSED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      OPEN: 'Ouvert',
      IN_PROGRESS: 'En cours',
      RESOLVED: 'Résolu',
      CLOSED: 'Fermé',
    };
    return labels[status] || status;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ACCIDENT':
        return 'red';
      case 'BREAKDOWN':
        return 'orange';
      case 'DAMAGE':
        return 'yellow';
      case 'OTHER':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      ACCIDENT: 'Accident',
      BREAKDOWN: 'Panne',
      DAMAGE: 'Dommage',
      OTHER: 'Autre',
    };
    return labels[type] || type;
  };

  const viewProblemDetails = (problem: any) => {
    setSelectedProblem(problem);
    setAdminResponse(problem.adminResponse || '');
    onOpen();
  };

  const handleRespond = async () => {
    if (!selectedProblem || !adminResponse.trim()) {
      alert('Veuillez entrer une réponse');
      return;
    }

    try {
      const response = await fetch(`/api/problems/${selectedProblem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'RESOLVED',
          adminResponse: adminResponse,
          respondedBy: 'Admin', // TODO: Utiliser l'ID de l'admin connecté
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      alert('Réponse envoyée avec succès!');
      onClose();
      // Rafraîchir la liste des problèmes
      window.location.reload();
    } catch (error: any) {
      alert(`Erreur: ${error.message}`);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Gestion des Problèmes et Incidents
        </Heading>
        <Text color="gray.600">
          Gérez les problèmes signalés par les clients 24/7
        </Text>
      </Box>

      {/* Stats */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Total Incidents
              </StatLabel>
              <StatNumber fontSize="2xl">{problems.length}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Ouverts
              </StatLabel>
              <StatNumber fontSize="2xl" color="red.500">
                {problems.filter((p) => p.status === 'OPEN').length}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                En cours
              </StatLabel>
              <StatNumber fontSize="2xl" color="yellow.500">
                {problems.filter((p) => p.status === 'IN_PROGRESS').length}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Résolus
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.500">
                {problems.filter((p) => p.status === 'RESOLVED').length}
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Filters */}
      <Card className="glass">
        <CardBody>
          <HStack spacing={4}>
            <Select placeholder="Tous les types" maxW="200px">
              <option value="ACCIDENT">Accident</option>
              <option value="BREAKDOWN">Panne</option>
              <option value="DAMAGE">Dommage</option>
              <option value="OTHER">Autre</option>
            </Select>
            <Select placeholder="Tous les statuts" maxW="200px">
              <option value="OPEN">Ouvert</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="RESOLVED">Résolu</option>
              <option value="CLOSED">Fermé</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Problems Table */}
      <Card className="glass">
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Sujet</Th>
                <Th>Client</Th>
                <Th>Date</Th>
                <Th>Photos</Th>
                <Th>Statut</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {problems.map((problem) => (
                <Tr key={problem.id}>
                  <Td fontWeight="semibold">{problem.id}</Td>
                  <Td>
                    <Badge colorScheme={getTypeColor(problem.type)}>
                      <HStack spacing={1}>
                        <Icon as={FiAlertCircle} />
                        <Text>{getTypeLabel(problem.type)}</Text>
                      </HStack>
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontWeight="semibold" noOfLines={1} maxW="300px">
                      {problem.subject}
                    </Text>
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      {problem.description}
                    </Text>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="semibold">{problem.userName}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {problem.userEmail}
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    {format(new Date(problem.createdAt), 'd MMM yyyy HH:mm', {
                      locale: fr,
                    })}
                  </Td>
                  <Td>
                    <Badge>{problem.photos.length} photo(s)</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(problem.status)}>
                      {getStatusLabel(problem.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Voir détails"
                        icon={<Icon as={FiEye} />}
                        size="sm"
                        variant="ghost"
                        onClick={() => viewProblemDetails(problem)}
                      />
                      {problem.status === 'OPEN' && (
                        <IconButton
                          aria-label="Répondre"
                          icon={<Icon as={FiCheck} />}
                          size="sm"
                          colorScheme="green"
                          variant="ghost"
                          onClick={() => viewProblemDetails(problem)}
                        />
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Problem Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent className="glass">
          <ModalHeader>
            <HStack>
              <Icon
                as={FiAlertCircle}
                boxSize={6}
                color={getTypeColor(selectedProblem?.type)}
              />
              <Box>
                <Text>{selectedProblem?.id}</Text>
                <Badge colorScheme={getTypeColor(selectedProblem?.type)} mt={1}>
                  {getTypeLabel(selectedProblem?.type)}
                </Badge>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Sujet */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Sujet
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  {selectedProblem?.subject}
                </Text>
              </Box>

              {/* Description */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Description
                </Text>
                <Text>{selectedProblem?.description}</Text>
              </Box>

              {/* Client info */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Client
                </Text>
                <HStack>
                  <Box>
                    <Text fontWeight="semibold">{selectedProblem?.userName}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {selectedProblem?.userEmail}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {/* Date */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Date de signalement
                </Text>
                <HStack>
                  <Icon as={FiClock} color="brand.500" />
                  <Text fontWeight="semibold">
                    {selectedProblem?.createdAt &&
                      format(new Date(selectedProblem.createdAt), 'd MMM yyyy à HH:mm', {
                        locale: fr,
                      })}
                  </Text>
                </HStack>
              </Box>

              {/* Photos */}
              {selectedProblem?.photos && selectedProblem.photos.length > 0 && (
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Photos ({selectedProblem.photos.length})
                  </Text>
                  <SimpleGrid columns={3} spacing={4}>
                    {selectedProblem.photos.map((photo: string, index: number) => (
                      <Box
                        key={index}
                        h="150px"
                        bg="gray.100"
                        borderRadius="md"
                        overflow="hidden"
                        cursor="pointer"
                      >
                        <Box
                          w="full"
                          h="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="gray.500">Photo {index + 1}</Text>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              )}

              {/* Statut */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Statut actuel
                </Text>
                <Badge
                  colorScheme={getStatusColor(selectedProblem?.status)}
                  fontSize="md"
                  p={2}
                >
                  {getStatusLabel(selectedProblem?.status)}
                </Badge>
              </Box>

              {/* Admin Response */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Réponse de l&apos;administrateur
                </Text>
                {selectedProblem?.adminResponse ? (
                  <Card bg="green.50" borderColor="green.200" borderWidth="1px">
                    <CardBody>
                      <Text>{selectedProblem.adminResponse}</Text>
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        Répondu le{' '}
                        {selectedProblem.respondedAt &&
                          format(
                            new Date(selectedProblem.respondedAt),
                            'd MMM yyyy à HH:mm',
                            { locale: fr }
                          )}
                      </Text>
                    </CardBody>
                  </Card>
                ) : (
                  <Textarea
                    placeholder="Entrez votre réponse au client..."
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    rows={4}
                  />
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fermer
            </Button>
            {!selectedProblem?.adminResponse && (
              <>
                <Button
                  colorScheme="yellow"
                  mr={3}
                  leftIcon={<Icon as={FiClock} />}
                >
                  Marquer en cours
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleRespond}
                  leftIcon={<Icon as={FiCheck} />}
                >
                  Envoyer et Résoudre
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
