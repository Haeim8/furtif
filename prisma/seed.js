import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seeding...');

  // Nettoyer la BDD
  await prisma.problem.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.emailCampaign.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Base de données nettoyée');

  // Créer des utilisateurs de test
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin Montreal',
      email: 'admin@montrealrental.com',
      role: 'ADMIN',
      phone: '514-555-1234',
      address: '123 Rue Saint-Catherine',
      city: 'Montréal',
      postalCode: 'H2X 1Y7',
    },
  });

  const clients = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        role: 'CLIENT',
        phone: '514-555-0001',
        address: '456 Rue Sherbrooke',
        city: 'Montréal',
        postalCode: 'H3A 1B4',
        driverLicense: 'https://example.com/licenses/jean.jpg',
        iban: 'FR7612345678901234567890123',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Marie Martin',
        email: 'marie.martin@email.com',
        role: 'CLIENT',
        phone: '514-555-0002',
        address: '789 Boulevard René-Lévesque',
        city: 'Montréal',
        postalCode: 'H2Z 1A3',
        driverLicense: 'https://example.com/licenses/marie.jpg',
        iban: 'FR7698765432109876543210987',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Pierre Leblanc',
        email: 'pierre.leblanc@email.com',
        role: 'CLIENT',
        phone: '514-555-0003',
        address: '321 Avenue du Parc',
        city: 'Montréal',
        postalCode: 'H2W 2P2',
        driverLicense: 'https://example.com/licenses/pierre.jpg',
      },
    }),
  ]);

  console.log('✅ Utilisateurs créés:', clients.length + 1);

  // Créer des véhicules de test
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2024,
        color: 'Bleu',
        licensePlate: 'ABC-123',
        type: 'SEDAN',
        transmission: 'AUTOMATIC',
        fuelType: 'ESSENCE',
        seats: 5,
        doors: 4,
        fuelConsumption: 6.5,
        pricePerDay: 49.99,
        deposit: 500,
        images: JSON.stringify(['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
        features: JSON.stringify(['GPS', 'Bluetooth', 'Air Conditionné', 'Caméra de recul']),
        status: 'AVAILABLE',
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Ford',
        model: 'F-150',
        year: 2024,
        color: 'Rouge',
        licensePlate: 'XYZ-789',
        type: 'PICKUP',
        transmission: 'AUTOMATIC',
        fuelType: 'DIESEL',
        seats: 5,
        doors: 4,
        fuelConsumption: 10.2,
        pricePerDay: 89.99,
        deposit: 1000,
        images: JSON.stringify(['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        features: JSON.stringify(['4x4', 'GPS', 'Bluetooth', 'Système audio premium']),
        status: 'RENTED',
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Tesla',
        model: 'Model 3',
        year: 2024,
        color: 'Blanc',
        licensePlate: 'TES-456',
        type: 'ELECTRIC',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 5,
        doors: 4,
        fuelConsumption: 0,
        pricePerDay: 119.99,
        deposit: 1500,
        images: JSON.stringify(['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
        features: JSON.stringify(['Autopilot', 'Supercharge', 'Écran tactile 15"', 'Son premium']),
        status: 'AVAILABLE',
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'BMW',
        model: 'X5',
        year: 2024,
        color: 'Noir',
        licensePlate: 'BMW-555',
        type: 'LUXURY',
        transmission: 'AUTOMATIC',
        fuelType: 'ESSENCE',
        seats: 7,
        doors: 4,
        fuelConsumption: 9.5,
        pricePerDay: 149.99,
        deposit: 2000,
        images: JSON.stringify(['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        features: JSON.stringify(['Sièges chauffants', 'Toit panoramique', 'HUD', 'Caméra 360°']),
        status: 'AVAILABLE',
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Honda',
        model: 'Civic',
        year: 2024,
        color: 'Gris',
        licensePlate: 'HON-246',
        type: 'SEDAN',
        transmission: 'AUTOMATIC',
        fuelType: 'ESSENCE',
        seats: 5,
        doors: 4,
        fuelConsumption: 6.0,
        pricePerDay: 45.99,
        deposit: 450,
        images: JSON.stringify(['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
        features: JSON.stringify(['Bluetooth', 'Air Conditionné', 'Régulateur de vitesse']),
        status: 'AVAILABLE',
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Mercedes',
        model: 'Sprinter',
        year: 2024,
        color: 'Blanc',
        licensePlate: 'SPR-777',
        type: 'VAN',
        transmission: 'AUTOMATIC',
        fuelType: 'DIESEL',
        seats: 12,
        doors: 4,
        fuelConsumption: 12.5,
        pricePerDay: 129.99,
        deposit: 1200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=800']),
        mainImage: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=800',
        features: JSON.stringify(['12 passagers', 'Climatisation arrière', 'GPS', 'Caméra de recul']),
        status: 'AVAILABLE',
      },
    }),
  ]);

  console.log('✅ Véhicules créés:', vehicles.length);

  // Créer des réservations de test
  const reservations = await Promise.all([
    prisma.reservation.create({
      data: {
        userId: clients[0].id,
        vehicleId: vehicles[1].id, // Ford F-150
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-16'),
        totalPrice: 629.94,
        depositPaid: 1000,
        status: 'ACTIVE',
        stripePaymentId: 'pi_test_123456789',
        stripeDepositId: 'pi_test_dep_123456',
      },
    }),
    prisma.reservation.create({
      data: {
        userId: clients[1].id,
        vehicleId: vehicles[0].id, // Toyota Corolla
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-01-20'),
        totalPrice: 249.95,
        depositPaid: 500,
        status: 'CONFIRMED',
        stripePaymentId: 'pi_test_234567890',
        stripeDepositId: 'pi_test_dep_234567',
      },
    }),
    prisma.reservation.create({
      data: {
        userId: clients[2].id,
        vehicleId: vehicles[3].id, // BMW X5
        startDate: new Date('2025-01-12'),
        endDate: new Date('2025-01-18'),
        totalPrice: 899.94,
        depositPaid: 2000,
        status: 'PENDING',
        stripePaymentId: 'pi_test_345678901',
        stripeDepositId: 'pi_test_dep_345678',
      },
    }),
  ]);

  console.log('✅ Réservations créées:', reservations.length);

  // Créer des problèmes de test
  const problems = await Promise.all([
    prisma.problem.create({
      data: {
        userId: clients[0].id,
        type: 'BREAKDOWN',
        subject: 'Pneu crevé sur l\'autoroute',
        description: 'Le pneu avant gauche a crevé sur l\'autoroute 40. Besoin d\'assistance immédiate.',
        photos: JSON.stringify(['https://example.com/photos/problem1.jpg']),
        status: 'OPEN',
      },
    }),
    prisma.problem.create({
      data: {
        userId: clients[1].id,
        type: 'DAMAGE',
        subject: 'Rayure sur la portière',
        description: 'Une rayure est apparue sur la portière passager. Je ne sais pas comment c\'est arrivé.',
        photos: JSON.stringify(['https://example.com/photos/problem2.jpg', 'https://example.com/photos/problem2-2.jpg']),
        status: 'IN_PROGRESS',
        adminResponse: 'Nous examinons les photos. Un agent vous contactera sous peu.',
        respondedBy: adminUser.id,
        respondedAt: new Date(),
      },
    }),
  ]);

  console.log('✅ Problèmes créés:', problems.length);

  // Créer des campagnes email de test
  const emailCampaigns = await Promise.all([
    prisma.emailCampaign.create({
      data: {
        name: 'Promo Été 2025',
        subject: '🌞 Profitez de -20% sur toute notre flotte !',
        content: 'Réservez maintenant et économisez 20% sur toutes les locations de plus de 7 jours.',
        sentTo: JSON.stringify(['ALL']),
        status: 'SENT',
        sentCount: 150,
        openedCount: 95,
        clickedCount: 42,
        sentAt: new Date('2025-01-05'),
      },
    }),
    prisma.emailCampaign.create({
      data: {
        name: 'Nouvelle Tesla disponible',
        subject: '⚡ Découvrez notre nouvelle Tesla Model 3',
        content: 'Nous sommes heureux d\'annoncer l\'arrivée de notre Tesla Model 3 dans notre flotte.',
        sentTo: JSON.stringify(['ALL']),
        status: 'DRAFT',
      },
    }),
  ]);

  console.log('✅ Campagnes email créées:', emailCampaigns.length);

  console.log('\n🎉 Seeding terminé avec succès !');
  console.log(`   - ${1} admin`);
  console.log(`   - ${clients.length} clients`);
  console.log(`   - ${vehicles.length} véhicules`);
  console.log(`   - ${reservations.length} réservations`);
  console.log(`   - ${problems.length} problèmes`);
  console.log(`   - ${emailCampaigns.length} campagnes email`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
