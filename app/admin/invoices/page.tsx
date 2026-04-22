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
  Select,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiMail,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMoreVertical,
  FiEye,
} from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function InvoicesPage() {
  // Données de test
  const invoices = [
    {
      id: 'INV-001',
      invoiceNumber: '2025-001',
      reservationId: 'RES-001',
      client: 'Jean Dupont',
      clientEmail: 'jean.dupont@example.com',
      vehicle: 'Toyota Corolla 2024',
      subtotal: 225,
      tax: 33.75,
      total: 258.75,
      deposit: 500,
      depositStatus: 'RETURNED',
      paymentStatus: 'PAID',
      stripePaymentId: 'pi_1234567890',
      pdfUrl: '/invoices/INV-001.pdf',
      sentAt: '2025-01-12T10:30:00',
      createdAt: '2025-01-12T10:00:00',
    },
    {
      id: 'INV-002',
      invoiceNumber: '2025-002',
      reservationId: 'RES-002',
      client: 'Marie Martin',
      clientEmail: 'marie.martin@example.com',
      vehicle: 'Ford F-150 2024',
      subtotal: 665,
      tax: 99.75,
      total: 764.75,
      deposit: 800,
      depositStatus: 'HELD',
      paymentStatus: 'PAID',
      stripePaymentId: 'pi_0987654321',
      pdfUrl: '/invoices/INV-002.pdf',
      sentAt: '2025-01-13T09:15:00',
      createdAt: '2025-01-13T09:00:00',
    },
    {
      id: 'INV-003',
      invoiceNumber: '2025-003',
      reservationId: 'RES-003',
      client: 'Pierre Leblanc',
      clientEmail: 'pierre.leblanc@example.com',
      vehicle: 'Tesla Model 3',
      subtotal: 480,
      tax: 72,
      total: 552,
      deposit: 1000,
      depositStatus: 'PENDING',
      paymentStatus: 'PENDING',
      stripePaymentId: null,
      pdfUrl: null,
      sentAt: null,
      createdAt: '2025-01-10T14:00:00',
    },
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'green';
      case 'PENDING':
        return 'yellow';
      case 'FAILED':
        return 'red';
      case 'REFUNDED':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      PAID: 'Payé',
      PENDING: 'En attente',
      FAILED: 'Échoué',
      REFUNDED: 'Remboursé',
    };
    return labels[status] || status;
  };

  const getDepositStatusColor = (status: string) => {
    switch (status) {
      case 'HELD':
        return 'blue';
      case 'RETURNED':
        return 'green';
      case 'USED':
        return 'orange';
      case 'PENDING':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const getDepositStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      HELD: 'Retenue',
      RETURNED: 'Remboursée',
      USED: 'Utilisée',
      PENDING: 'En attente',
    };
    return labels[status] || status;
  };

  const totalRevenue = invoices
    .filter((i) => i.paymentStatus === 'PAID')
    .reduce((sum, i) => sum + i.total, 0);

  const pendingPayments = invoices
    .filter((i) => i.paymentStatus === 'PENDING')
    .reduce((sum, i) => sum + i.total, 0);

  const totalDepositsHeld = invoices
    .filter((i) => i.depositStatus === 'HELD')
    .reduce((sum, i) => sum + i.deposit, 0);

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Factures & Transactions Financières
        </Heading>
        <Text color="gray.600">
          Gérez les factures, paiements Stripe et cautions
        </Text>
      </Box>

      {/* Stats */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Revenus Totaux
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.600">
                {totalRevenue.toFixed(2)}$
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +12% ce mois
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Paiements en Attente
              </StatLabel>
              <StatNumber fontSize="2xl" color="yellow.600">
                {pendingPayments.toFixed(2)}$
              </StatNumber>
              <StatHelpText>
                {invoices.filter((i) => i.paymentStatus === 'PENDING').length}{' '}
                factures
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Cautions Retenues
              </StatLabel>
              <StatNumber fontSize="2xl" color="blue.600">
                {totalDepositsHeld.toFixed(2)}$
              </StatNumber>
              <StatHelpText>En attente de retour</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card className="glass">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.600">
                Total Factures
              </StatLabel>
              <StatNumber fontSize="2xl">{invoices.length}</StatNumber>
              <StatHelpText>Ce mois</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Filters */}
      <Card className="glass">
        <CardBody>
          <HStack spacing={4}>
            <Select placeholder="Statut paiement" maxW="200px">
              <option value="PAID">Payé</option>
              <option value="PENDING">En attente</option>
              <option value="FAILED">Échoué</option>
              <option value="REFUNDED">Remboursé</option>
            </Select>
            <Select placeholder="Statut caution" maxW="200px">
              <option value="HELD">Retenue</option>
              <option value="RETURNED">Remboursée</option>
              <option value="USED">Utilisée</option>
            </Select>
            <Select placeholder="Période" maxW="200px">
              <option value="today">Aujourd&apos;hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Invoices Table */}
      <Card className="glass">
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>N° Facture</Th>
                <Th>Client</Th>
                <Th>Véhicule</Th>
                <Th>Montant</Th>
                <Th>Caution</Th>
                <Th>Paiement</Th>
                <Th>Stripe ID</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoices.map((invoice) => (
                <Tr key={invoice.id}>
                  <Td fontWeight="semibold">{invoice.invoiceNumber}</Td>
                  <Td>
                    <Box>
                      <Text fontWeight="semibold">{invoice.client}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {invoice.clientEmail}
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <Text fontSize="sm" noOfLines={1} maxW="200px">
                      {invoice.vehicle}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color="brand.600">
                        {invoice.total.toFixed(2)}$
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        TPS: {invoice.tax.toFixed(2)}$
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold">{invoice.deposit}$</Text>
                      <Badge
                        colorScheme={getDepositStatusColor(invoice.depositStatus)}
                        fontSize="xs"
                      >
                        {getDepositStatusLabel(invoice.depositStatus)}
                      </Badge>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={getPaymentStatusColor(invoice.paymentStatus)}
                    >
                      <HStack spacing={1}>
                        <Icon
                          as={
                            invoice.paymentStatus === 'PAID'
                              ? FiCheckCircle
                              : invoice.paymentStatus === 'FAILED'
                              ? FiXCircle
                              : FiClock
                          }
                        />
                        <Text>{getPaymentStatusLabel(invoice.paymentStatus)}</Text>
                      </HStack>
                    </Badge>
                  </Td>
                  <Td>
                    {invoice.stripePaymentId ? (
                      <Text fontSize="xs" fontFamily="mono" color="gray.600">
                        {invoice.stripePaymentId.substring(0, 15)}...
                      </Text>
                    ) : (
                      <Text fontSize="xs" color="gray.400">
                        N/A
                      </Text>
                    )}
                  </Td>
                  <Td>
                    {format(new Date(invoice.createdAt), 'd MMM yyyy', {
                      locale: fr,
                    })}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      {invoice.pdfUrl && (
                        <IconButton
                          aria-label="Télécharger PDF"
                          icon={<Icon as={FiDownload} />}
                          size="sm"
                          variant="ghost"
                        />
                      )}
                      <IconButton
                        aria-label="Voir"
                        icon={<Icon as={FiEye} />}
                        size="sm"
                        variant="ghost"
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<Icon as={FiMoreVertical} />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          {!invoice.sentAt && (
                            <MenuItem icon={<Icon as={FiMail} />}>
                              Envoyer par email
                            </MenuItem>
                          )}
                          {invoice.depositStatus === 'HELD' && (
                            <MenuItem icon={<Icon as={FiDollarSign} />}>
                              Rembourser la caution
                            </MenuItem>
                          )}
                          {invoice.paymentStatus === 'PAID' && (
                            <MenuItem icon={<Icon as={FiCreditCard} />}>
                              Voir sur Stripe
                            </MenuItem>
                          )}
                          {invoice.paymentStatus === 'FAILED' && (
                            <MenuItem icon={<Icon as={FiCreditCard} />} color="red.500">
                              Relancer le paiement
                            </MenuItem>
                          )}
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

      {/* Stripe Info */}
      <Card className="glass" bg="blue.50">
        <CardBody>
          <HStack>
            <Icon as={FiCreditCard} boxSize={6} color="blue.500" />
            <Box>
              <Text fontWeight="semibold">Intégration Stripe</Text>
              <Text fontSize="sm" color="gray.600">
                Tous les paiements sont traités de manière sécurisée via Stripe.
                Les cautions sont pré-autorisées et débloquées automatiquement après
                le retour du véhicule.
              </Text>
            </Box>
            <Button colorScheme="blue" size="sm">
              Voir Dashboard Stripe
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
