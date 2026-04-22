'use client';

import {
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Heading,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';

interface StripePaymentFormProps {
  amount: number; // Montant de la caution en $
  onSuccess?: (paymentIntentId: string) => void;
  onCancel?: () => void;
}

export function StripePaymentForm({
  amount,
  onSuccess,
  onCancel,
}: StripePaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const toast = useToast();

  const handleCreatePaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          metadata: {
            type: 'caution',
            date: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);

      toast({
        title: 'Pré-autorisation créée',
        description: `${amount}$ CAD ont été pré-autorisés sur votre carte`,
        status: 'success',
        duration: 5000,
      });

      if (onSuccess) {
        onSuccess(data.paymentIntentId);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la pré-autorisation',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={2} align="start">
        <Heading size="md">Caution de sécurité</Heading>
        <Text color="gray.600" fontSize="sm">
          Une pré-autorisation sera effectuée sur votre carte. Les fonds ne seront
          pas prélevés, seulement bloqués temporairement.
        </Text>
      </VStack>

      <Box
        p={6}
        bg="blue.50"
        borderRadius="xl"
        border="2px solid"
        borderColor="blue.200"
      >
        <VStack spacing={3} align="start">
          <HStack justify="space-between" w="full">
            <Text fontWeight="semibold" color="blue.900">
              Montant de la caution
            </Text>
            <Badge colorScheme="blue" fontSize="lg" px={3} py={1}>
              {amount}$ CAD
            </Badge>
          </HStack>

          <Text fontSize="sm" color="blue.700">
            Cette somme sera débloquée automatiquement au retour du véhicule si
            aucun dommage n&apos;est constaté.
          </Text>
        </VStack>
      </Box>

      <VStack spacing={3}>
        <Button
          colorScheme="brand"
          size="lg"
          w="full"
          onClick={handleCreatePaymentIntent}
          isLoading={loading}
        >
          Autoriser la caution de {amount}$ CAD
        </Button>

        {onCancel && (
          <Button variant="ghost" size="lg" w="full" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </VStack>

      <Text fontSize="xs" color="gray.500" textAlign="center">
        Paiement sécurisé par Stripe. Vos informations sont protégées.
      </Text>
    </VStack>
  );
}
