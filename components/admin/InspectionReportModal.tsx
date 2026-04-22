'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Icon,
  Heading,
  Divider,
  Badge,
  Card,
  CardBody,
  Grid,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';

interface InspectionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inspection: any;
  type?: 'DEPARTURE' | 'RETURN';
  reservation?: any;
  onValidate?: () => void;
}

export function InspectionReportModal({
  isOpen,
  onClose,
  inspection,
  type: typeProp,
  reservation: reservationProp,
  onValidate,
}: InspectionReportModalProps) {
  if (!inspection) return null;

  // Extraire type et reservation depuis inspection si non fournis
  const type = typeProp || inspection.type;
  const reservation = reservationProp || inspection.reservation;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className="glass" maxH="90vh">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Heading size="md">
                Rapport d&apos;Inspection de {type === 'DEPARTURE' ? 'Départ' : 'Retour'}
              </Heading>
              <Badge colorScheme={type === 'DEPARTURE' ? 'blue' : 'orange'} fontSize="md">
                {type === 'DEPARTURE' ? 'DÉPART' : 'RETOUR'}
              </Badge>
              <Badge colorScheme="green" fontSize="md">
                <Icon as={FiCheck} mr={1} />
                SIGNÉ
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Réservation: {reservation?.id} • Client: {reservation?.user?.name || 'N/A'}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Date: {format(new Date(inspection.createdAt || inspection.date), 'd MMMM yyyy à HH:mm', { locale: fr })}
            </Text>
            <Badge colorScheme="red" fontSize="sm">
              DOCUMENT LÉGAL - LECTURE SEULE
            </Badge>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={8} align="stretch">
            {/* Informations Véhicule */}
            <Card className="glass" bg="blue.50">
              <CardBody>
                <Heading size="sm" mb={4}>
                  Informations du Véhicule
                </Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Kilométrage
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {inspection.mileage.toLocaleString()} km
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Niveau de Carburant
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {inspection.fuelLevel}%
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Photos Prises
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {Array.isArray(inspection.photos) ? inspection.photos.length : 0} photos
                    </Text>
                  </Box>
                </Grid>
              </CardBody>
            </Card>

            {/* Photos du Véhicule */}
            <Box>
              <Heading size="sm" mb={4}>
                Photos du Véhicule ({Array.isArray(inspection.photos) ? inspection.photos.length : 0})
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                {/* Simulation des photos - en production, mapper les vraies photos */}
                {Array.from({ length: Array.isArray(inspection.photos) ? inspection.photos.length : 0 }).map((_, index) => (
                  <Card key={index} className="glass">
                    <CardBody p={2}>
                      <Box
                        position="relative"
                        w="full"
                        h="150px"
                        borderRadius="md"
                        overflow="hidden"
                        bg="gray.100"
                        border="2px solid"
                        borderColor="green.500"
                      >
                        <Box
                          w="full"
                          h="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="gray.500" fontSize="sm">
                            Photo {index + 1}
                          </Text>
                        </Box>
                      </Box>
                      <Text fontSize="xs" color="gray.600" mt={2} textAlign="center">
                        {['Face Avant', 'Face Arrière', 'Latéral Gauche', 'Latéral Droit', 'Jante AV G', 'Jante AV D', 'Jante AR G', 'Jante AR D', 'Tableau de Bord', 'Intérieur AV', 'Intérieur AR', 'Coffre', 'Toit', 'Capot', 'Plaque'][index] || `Photo ${index + 1}`}
                      </Text>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Dommages Constatés */}
            {inspection.damages && (
              <>
                <Box>
                  <Heading size="sm" mb={4}>
                    Dommages Constatés
                  </Heading>
                  <Card className="glass" bg="orange.50">
                    <CardBody>
                      <Text whiteSpace="pre-wrap">{inspection.damages}</Text>
                    </CardBody>
                  </Card>
                </Box>
                <Divider />
              </>
            )}

            {/* Remarques */}
            {inspection.notes && (
              <>
                <Box>
                  <Heading size="sm" mb={4}>
                    Remarques & Observations
                  </Heading>
                  <Card className="glass" bg="yellow.50">
                    <CardBody>
                      <Text whiteSpace="pre-wrap">{inspection.notes}</Text>
                    </CardBody>
                  </Card>
                </Box>
                <Divider />
              </>
            )}

            {/* Signatures */}
            <Box>
              <Heading size="sm" mb={4}>
                Signatures
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Signature Agent */}
                <Card className="glass">
                  <CardBody>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      Signature de l&apos;Agent
                    </Text>
                    <Box
                      border="2px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      bg="white"
                      h="150px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                    >
                      {/* En production, afficher la vraie signature */}
                      <Text color="gray.400" fontStyle="italic">
                        [Signature de l&apos;agent]
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="gray.600" mt={2}>
                      Signé le {format(new Date(inspection.signedAt || inspection.createdAt || inspection.date), 'd MMM yyyy à HH:mm', { locale: fr })}
                    </Text>
                  </CardBody>
                </Card>

                {/* Signature Client */}
                <Card className="glass">
                  <CardBody>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      Signature du Client
                    </Text>
                    <Box
                      border="2px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      bg="white"
                      h="150px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* En production, afficher la vraie signature */}
                      <Text color="gray.400" fontStyle="italic">
                        [Signature du client]
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="gray.600" mt={2}>
                      {reservation?.user?.name || 'Client'} - Signé le {format(new Date(inspection.signedAt || inspection.createdAt || inspection.date), 'd MMM yyyy à HH:mm', { locale: fr })}
                    </Text>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </Box>

            {/* Avertissement Légal */}
            <Card className="glass" bg="red.50" borderColor="red.300" borderWidth="2px">
              <CardBody>
                <HStack spacing={3}>
                  <Icon as={FiCheck} boxSize={6} color="red.500" />
                  <Box>
                    <Text fontWeight="bold" color="red.700">
                      Document Légal Certifié
                    </Text>
                    <Text fontSize="sm" color="red.600">
                      Ce rapport d&apos;inspection a été signé par l&apos;agent et le client. Il ne peut pas être modifié.
                      Il constitue une preuve légale de l&apos;état du véhicule au moment de l&apos;inspection.
                    </Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            leftIcon={<Icon as={FiDownload} />}
            colorScheme="blue"
            mr={3}
          >
            Télécharger PDF
          </Button>
          <Button
            leftIcon={<Icon as={FiPrinter} />}
            colorScheme="gray"
            mr={3}
          >
            Imprimer
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
