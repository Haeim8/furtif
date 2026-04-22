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
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Textarea,
  Divider,
  useColorMode,
  Icon,
  Grid,
} from '@chakra-ui/react';
import {
  FiMoon,
  FiSun,
  FiBell,
  FiMail,
  FiDollarSign,
  FiShield,
  FiGlobe,
} from 'react-icons/fi';

export default function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Paramètres
        </Heading>
        <Text color="gray.600">
          Configurez votre agence et vos préférences
        </Text>
      </Box>

      {/* Appearance */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={colorMode === 'dark' ? FiMoon : FiSun} boxSize={5} color="brand.500" />
              <Heading size="md">Apparence</Heading>
            </HStack>
            <Divider />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark-mode" mb="0" flex="1">
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">Mode Sombre</Text>
                  <Text fontSize="sm" color="gray.500">
                    Activer le thème sombre pour l&apos;interface admin
                  </Text>
                </VStack>
              </FormLabel>
              <Switch
                id="dark-mode"
                size="lg"
                colorScheme="brand"
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Company Info */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FiGlobe} boxSize={5} color="brand.500" />
              <Heading size="md">Informations de l&apos;Agence</Heading>
            </HStack>
            <Divider />
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Nom de l&apos;Agence</FormLabel>
                <Input placeholder="Montreal Car Rental" />
              </FormControl>
              <FormControl>
                <FormLabel>Email de Contact</FormLabel>
                <Input type="email" placeholder="contact@rental.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Téléphone</FormLabel>
                <Input placeholder="+1 514-555-0123" />
              </FormControl>
              <FormControl>
                <FormLabel>Site Web</FormLabel>
                <Input placeholder="https://rental.com" />
              </FormControl>
              <FormControl gridColumn="span 2">
                <FormLabel>Adresse</FormLabel>
                <Input placeholder="123 Rue Principale, Montreal, QC" />
              </FormControl>
            </Grid>
            <Button colorScheme="brand" alignSelf="start">
              Sauvegarder
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FiBell} boxSize={5} color="brand.500" />
              <Heading size="md">Notifications</Heading>
            </HStack>
            <Divider />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notif-reservations" mb="0" flex="1">
                <Text fontWeight="semibold">Nouvelles Réservations</Text>
              </FormLabel>
              <Switch id="notif-reservations" size="lg" colorScheme="brand" defaultChecked />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notif-problems" mb="0" flex="1">
                <Text fontWeight="semibold">Problèmes Signalés</Text>
              </FormLabel>
              <Switch id="notif-problems" size="lg" colorScheme="brand" defaultChecked />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notif-returns" mb="0" flex="1">
                <Text fontWeight="semibold">Retours de Véhicules</Text>
              </FormLabel>
              <Switch id="notif-returns" size="lg" colorScheme="brand" defaultChecked />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notif-payments" mb="0" flex="1">
                <Text fontWeight="semibold">Paiements Reçus</Text>
              </FormLabel>
              <Switch id="notif-payments" size="lg" colorScheme="brand" defaultChecked />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Email Settings */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FiMail} boxSize={5} color="brand.500" />
              <Heading size="md">Configuration Email</Heading>
            </HStack>
            <Divider />
            <FormControl>
              <FormLabel>Email Expéditeur</FormLabel>
              <Input placeholder="noreply@rental.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Nom de l&apos;Expéditeur</FormLabel>
              <Input placeholder="Montreal Car Rental" />
            </FormControl>
            <FormControl>
              <FormLabel>Signature Email</FormLabel>
              <Textarea
                placeholder="Cordialement,&#10;L'équipe Montreal Car Rental"
                rows={4}
              />
            </FormControl>
            <Button colorScheme="brand" alignSelf="start">
              Sauvegarder
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Pricing */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FiDollarSign} boxSize={5} color="brand.500" />
              <Heading size="md">Tarification</Heading>
            </HStack>
            <Divider />
            <FormControl>
              <FormLabel>Taux de Taxe (%)</FormLabel>
              <Input type="number" placeholder="15" defaultValue="15" />
            </FormControl>
            <FormControl>
              <FormLabel>Devise</FormLabel>
              <Select defaultValue="CAD">
                <option value="CAD">CAD ($)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Caution Minimum ($)</FormLabel>
              <Input type="number" placeholder="500" defaultValue="500" />
            </FormControl>
            <Button colorScheme="brand" alignSelf="start">
              Sauvegarder
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Security */}
      <Card className="glass">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FiShield} boxSize={5} color="brand.500" />
              <Heading size="md">Sécurité</Heading>
            </HStack>
            <Divider />
            <FormControl>
              <FormLabel>Changer le Mot de Passe</FormLabel>
              <Input type="password" placeholder="Ancien mot de passe" mb={2} />
              <Input type="password" placeholder="Nouveau mot de passe" mb={2} />
              <Input type="password" placeholder="Confirmer le mot de passe" />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="2fa" mb="0" flex="1">
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">Authentification à 2 Facteurs</Text>
                  <Text fontSize="sm" color="gray.500">
                    Ajouter une couche de sécurité supplémentaire
                  </Text>
                </VStack>
              </FormLabel>
              <Switch id="2fa" size="lg" colorScheme="brand" />
            </FormControl>
            <Button colorScheme="brand" alignSelf="start">
              Mettre à Jour
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
