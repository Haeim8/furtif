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
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Stack,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiMail,
  FiSend,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiUsers,
  FiBarChart2,
} from 'react-icons/fi';
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function EmailCampaignsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    subject: '',
    content: '',
    recipients: [] as string[],
  });

  // Données de test
  const campaigns = [
    {
      id: '1',
      name: 'Promotion Hiver 2025',
      subject: '❄️ -20% sur toutes les locations ce mois !',
      content: 'Profitez de nos offres spéciales hiver...',
      status: 'SENT',
      sentTo: ['ALL_SUBSCRIBERS'],
      sentCount: 156,
      openedCount: 89,
      clickedCount: 34,
      sentAt: '2025-01-05T10:00:00',
      createdAt: '2025-01-03T14:00:00',
    },
    {
      id: '2',
      name: 'Newsletter Janvier',
      subject: '🚗 Nouveaux véhicules disponibles',
      content: 'Découvrez notre nouvelle flotte...',
      status: 'SCHEDULED',
      sentTo: ['ALL_SUBSCRIBERS'],
      sentCount: 0,
      openedCount: 0,
      clickedCount: 0,
      scheduledAt: '2025-01-15T09:00:00',
      createdAt: '2025-01-10T16:30:00',
    },
    {
      id: '3',
      name: 'Feedback Clients',
      subject: 'Votre avis compte ! 💬',
      content: 'Partagez votre expérience...',
      status: 'DRAFT',
      sentTo: [],
      sentCount: 0,
      openedCount: 0,
      clickedCount: 0,
      createdAt: '2025-01-11T11:00:00',
    },
  ];

  // Liste des clients
  const clients = [
    { id: '1', name: 'Jean Dupont', email: 'jean.dupont@example.com', subscribed: true },
    { id: '2', name: 'Marie Martin', email: 'marie.martin@example.com', subscribed: true },
    { id: '3', name: 'Pierre Leblanc', email: 'pierre.leblanc@example.com', subscribed: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'green';
      case 'SCHEDULED':
        return 'blue';
      case 'DRAFT':
        return 'gray';
      case 'FAILED':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      SENT: 'Envoyée',
      SCHEDULED: 'Planifiée',
      DRAFT: 'Brouillon',
      FAILED: 'Échouée',
    };
    return labels[status] || status;
  };

  const subscribedClients = clients.filter((c) => c.subscribed);
  const totalCampaigns = campaigns.length;
  const sentCampaigns = campaigns.filter((c) => c.status === 'SENT');
  const avgOpenRate =
    sentCampaigns.length > 0
      ? (sentCampaigns.reduce((sum, c) => sum + c.openedCount, 0) /
          sentCampaigns.reduce((sum, c) => sum + c.sentCount, 0)) *
        100
      : 0;

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between">
        <Box>
          <Heading size="lg" mb={2}>
            Campagnes Email Marketing
          </Heading>
          <Text color="gray.600">
            Créez et gérez vos campagnes d&apos;emailing
          </Text>
        </Box>
        <Button
          leftIcon={<Icon as={FiPlus} />}
          colorScheme="brand"
          size="lg"
          onClick={onOpen}
        >
          Nouvelle Campagne
        </Button>
      </HStack>

      {/* Stats */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Total Campagnes
              </StatLabel>
              <StatNumber fontSize="2xl">{totalCampaigns}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Abonnés
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.600">
                {subscribedClients.length}
              </StatNumber>
              <StatHelpText>Sur {clients.length} clients</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Taux d&apos;ouverture
              </StatLabel>
              <StatNumber fontSize="2xl" color="blue.600">
                {avgOpenRate.toFixed(1)}%
              </StatNumber>
              <StatHelpText>Moyenne</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Emails Envoyés
              </StatLabel>
              <StatNumber fontSize="2xl">
                {sentCampaigns.reduce((sum, c) => sum + c.sentCount, 0)}
              </StatNumber>
              <StatHelpText>Ce mois</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Campaigns Table */}
      <Card className="glass">
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th>Sujet</Th>
                <Th>Destinataires</Th>
                <Th>Statut</Th>
                <Th>Statistiques</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {campaigns.map((campaign) => (
                <Tr key={campaign.id}>
                  <Td fontWeight="semibold">{campaign.name}</Td>
                  <Td>
                    <Text noOfLines={1} maxW="300px">
                      {campaign.subject}
                    </Text>
                  </Td>
                  <Td>
                    <HStack>
                      <Icon as={FiUsers} color="brand.500" />
                      <Text>
                        {campaign.sentCount > 0
                          ? `${campaign.sentCount} clients`
                          : 'Non envoyée'}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </Td>
                  <Td>
                    {campaign.status === 'SENT' && (
                      <VStack align="start" spacing={1}>
                        <HStack fontSize="sm">
                          <Icon as={FiEye} color="blue.500" />
                          <Text>
                            {campaign.openedCount} ouvertures (
                            {((campaign.openedCount / campaign.sentCount) * 100).toFixed(
                              1
                            )}
                            %)
                          </Text>
                        </HStack>
                        <HStack fontSize="sm">
                          <Icon as={FiBarChart2} color="green.500" />
                          <Text>
                            {campaign.clickedCount} clics (
                            {((campaign.clickedCount / campaign.sentCount) * 100).toFixed(
                              1
                            )}
                            %)
                          </Text>
                        </HStack>
                      </VStack>
                    )}
                    {campaign.status !== 'SENT' && (
                      <Text fontSize="sm" color="gray.500">
                        Aucune statistique
                      </Text>
                    )}
                  </Td>
                  <Td>
                    {campaign.sentAt
                      ? format(new Date(campaign.sentAt), 'd MMM yyyy', { locale: fr })
                      : campaign.scheduledAt
                      ? `Prévu: ${format(new Date(campaign.scheduledAt), 'd MMM', {
                          locale: fr,
                        })}`
                      : format(new Date(campaign.createdAt), 'd MMM yyyy', {
                          locale: fr,
                        })}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Voir"
                        icon={<Icon as={FiEye} />}
                        size="sm"
                        variant="ghost"
                      />
                      {campaign.status === 'DRAFT' && (
                        <>
                          <IconButton
                            aria-label="Modifier"
                            icon={<Icon as={FiEdit} />}
                            size="sm"
                            variant="ghost"
                          />
                          <IconButton
                            aria-label="Envoyer"
                            icon={<Icon as={FiSend} />}
                            size="sm"
                            colorScheme="green"
                            variant="ghost"
                          />
                        </>
                      )}
                      <IconButton
                        aria-label="Supprimer"
                        icon={<Icon as={FiTrash2} />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* New Campaign Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent className="glass">
          <ModalHeader>Créer une Nouvelle Campagne</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Nom de la Campagne</FormLabel>
                <Input
                  placeholder="Ex: Promotion Hiver 2025"
                  value={campaignForm.name}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Sujet de l&apos;Email</FormLabel>
                <Input
                  placeholder="Ex: ❄️ -20% sur toutes les locations ce mois !"
                  value={campaignForm.subject}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, subject: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Contenu de l&apos;Email</FormLabel>
                <Textarea
                  placeholder="Écrivez votre message..."
                  rows={8}
                  value={campaignForm.content}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, content: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Destinataires</FormLabel>
                <Stack spacing={3}>
                  <Checkbox defaultChecked>
                    <HStack>
                      <Text>Tous les abonnés</Text>
                      <Badge colorScheme="brand">
                        {subscribedClients.length} clients
                      </Badge>
                    </HStack>
                  </Checkbox>
                  <Box pl={6}>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Ou sélectionner individuellement :
                    </Text>
                    <CheckboxGroup>
                      <Stack spacing={2}>
                        {clients.map((client) => (
                          <Checkbox key={client.id} isDisabled={!client.subscribed}>
                            <HStack>
                              <Text fontSize="sm">{client.name}</Text>
                              {!client.subscribed && (
                                <Badge colorScheme="red" fontSize="xs">
                                  Non abonné
                                </Badge>
                              )}
                            </HStack>
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </Box>
                </Stack>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              variant="outline"
              mr={3}
              leftIcon={<Icon as={FiCalendar} />}
            >
              Planifier
            </Button>
            <Button colorScheme="brand" leftIcon={<Icon as={FiSend} />}>
              Envoyer Maintenant
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Info Box */}
      <Card className="glass" bg="blue.50">
        <CardBody>
          <HStack>
            <Icon as={FiMail} boxSize={6} color="blue.500" />
            <Box>
              <Text fontWeight="semibold">Intégration Resend</Text>
              <Text fontSize="sm" color="gray.600">
                Tous les emails sont envoyés via Resend avec tracking des ouvertures
                et clics. Les clients peuvent se désabonner à tout moment.
              </Text>
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
