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
  useToast,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function PaymentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [actionType, setActionType] = useState<'capture' | 'cancel'>('capture');
  const [captureAmount, setCaptureAmount] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reservations');
      const reservations = await response.json();

      // Filtrer seulement les réservations avec un stripeDepositId
      const paymentsData = reservations
        .filter((res: any) => res.stripeDepositId)
        .map((res: any) => ({
          id: res.stripeDepositId,
          amount: res.depositPaid,
          status: res.depositReturned ? 'returned' : 'authorized',
          customerName: res.user?.name || 'N/A',
          customerEmail: res.user?.email || 'N/A',
          vehicleName: `${res.vehicle?.brand} ${res.vehicle?.model}` || 'N/A',
          reservationId: res.id,
          createdAt: new Date(res.createdAt),
          expiresAt: new Date(new Date(res.endDate).getTime() + 7 * 24 * 60 * 60 * 1000), // 7 jours après fin location
        }));

      setPayments(paymentsData);
    } catch (error) {
      console.error('Erreur chargement paiements:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les paiements',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = async () => {
    if (!selectedPayment) return;

    try {
      const response = await fetch('/api/stripe/capture-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: selectedPayment.id,
          amountToCapture: captureAmount ? parseFloat(captureAmount) : undefined,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Rafraîchir la liste des paiements
      await fetchPayments();

      toast({
        title: 'Paiement capturé',
        description: `${captureAmount || selectedPayment.amount}$ ont été prélevés`,
        status: 'success',
        duration: 5000,
      });

      onClose();
      setCaptureAmount('');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleCancel = async () => {
    if (!selectedPayment) return;

    try {
      const response = await fetch('/api/stripe/cancel-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: selectedPayment.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Rafraîchir la liste des paiements
      await fetchPayments();

      toast({
        title: 'Pré-autorisation annulée',
        description: 'La caution a été débloquée',
        status: 'success',
        duration: 5000,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const openCaptureModal = (payment: any) => {
    setSelectedPayment(payment);
    setActionType('capture');
    setCaptureAmount('');
    onOpen();
  };

  const openCancelModal = (payment: any) => {
    setSelectedPayment(payment);
    setActionType('cancel');
    onOpen();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'authorized':
        return (
          <Badge colorScheme="yellow" fontSize="sm">
            Pré-autorisé
          </Badge>
        );
      case 'captured':
        return (
          <Badge colorScheme="green" fontSize="sm">
            Capturé
          </Badge>
        );
      case 'canceled':
        return (
          <Badge colorScheme="gray" fontSize="sm">
            Annulé
          </Badge>
        );
      default:
        return (
          <Badge colorScheme="gray" fontSize="sm">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="xl">Gestion des paiements</Heading>
            <Text color="gray.600">
              Gérez les cautions et pré-autorisations Stripe
            </Text>
          </Box>
        </HStack>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.600">
                    Pré-autorisations actives
                  </Text>
                  <Heading size="lg" color="yellow.500">
                    {payments.filter((p) => p.status === 'authorized').length}
                  </Heading>
                </VStack>
                <Icon as={FiAlertCircle} boxSize={8} color="yellow.500" />
              </HStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.600">
                    Paiements capturés
                  </Text>
                  <Heading size="lg" color="green.500">
                    {payments.filter((p) => p.status === 'captured').length}
                  </Heading>
                </VStack>
                <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
              </HStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.600">
                    Total pré-autorisé
                  </Text>
                  <Heading size="lg" color="blue.500">
                    {payments
                      .filter((p) => p.status === 'authorized')
                      .reduce((sum, p) => sum + p.amount, 0)}
                    $
                  </Heading>
                </VStack>
                <Icon as={FiDollarSign} boxSize={8} color="blue.500" />
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Payments List */}
        <VStack spacing={4} align="stretch">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardBody>
                <HStack justify="space-between" wrap="wrap" spacing={4}>
                  <VStack align="start" spacing={1} flex={1} minW="200px">
                    <HStack>
                      <Heading size="sm">{payment.customerName}</Heading>
                      {getStatusBadge(payment.status)}
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {payment.customerEmail}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {payment.vehicleName} • {payment.reservationId}
                    </Text>
                  </VStack>

                  <VStack align="end" spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                      {payment.amount}$ CAD
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Créé le {payment.createdAt.toLocaleDateString('fr-CA')}
                    </Text>
                    <Text fontSize="xs" color="red.500">
                      Expire le {payment.expiresAt.toLocaleDateString('fr-CA')}
                    </Text>
                  </VStack>

                  {payment.status === 'authorized' && (
                    <HStack>
                      <Button
                        colorScheme="green"
                        size="sm"
                        leftIcon={<Icon as={FiCheckCircle} />}
                        onClick={() => openCaptureModal(payment)}
                      >
                        Capturer
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        leftIcon={<Icon as={FiXCircle} />}
                        onClick={() => openCancelModal(payment)}
                      >
                        Annuler
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>

      {/* Modal Capture/Cancel */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {actionType === 'capture'
              ? 'Capturer le paiement'
              : 'Annuler la pré-autorisation'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {actionType === 'capture' ? (
              <VStack spacing={4}>
                <Text>
                  Voulez-vous capturer le paiement pour{' '}
                  <strong>{selectedPayment?.customerName}</strong> ?
                </Text>

                <FormControl>
                  <FormLabel>
                    Montant à capturer (optionnel, max {selectedPayment?.amount}$)
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder={`${selectedPayment?.amount}`}
                    value={captureAmount}
                    onChange={(e) => setCaptureAmount(e.target.value)}
                    max={selectedPayment?.amount}
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Laisser vide pour capturer le montant total
                  </Text>
                </FormControl>

                <Box
                  p={4}
                  bg="yellow.50"
                  borderRadius="lg"
                  w="full"
                  borderLeft="4px solid"
                  borderColor="yellow.400"
                >
                  <Text fontSize="sm" color="yellow.800">
                    ⚠️ Cette action est irréversible. Le montant sera prélevé sur la
                    carte du client.
                  </Text>
                </Box>
              </VStack>
            ) : (
              <VStack spacing={4}>
                <Text>
                  Voulez-vous annuler la pré-autorisation pour{' '}
                  <strong>{selectedPayment?.customerName}</strong> ?
                </Text>

                <Box
                  p={4}
                  bg="blue.50"
                  borderRadius="lg"
                  w="full"
                  borderLeft="4px solid"
                  borderColor="blue.400"
                >
                  <Text fontSize="sm" color="blue.800">
                    ℹ️ La caution de {selectedPayment?.amount}$ sera débloquée
                    immédiatement.
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              colorScheme={actionType === 'capture' ? 'green' : 'red'}
              onClick={actionType === 'capture' ? handleCapture : handleCancel}
            >
              Confirmer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
