import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User";
import { MenuItem } from "../entities/MenuItem";
import { hashPassword } from "../utils/auth";

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected for seeding...");

  const userRepository = AppDataSource.getRepository(User);
  const menuItemRepository = AppDataSource.getRepository(MenuItem);

  // Clear existing (optional, but good for resetting state)
  // await AppDataSource.query(`DELETE FROM change_requests`);
  // await AppDataSource.query(`DELETE FROM users`);
  // await AppDataSource.query(`DELETE FROM menu_items`);

  // Seed Users
  const managerExists = await userRepository.findOne({ where: { email: "manager@sapphire.com" } });
  if (!managerExists) {
    const managerPassword = await hashPassword("password123");
    const manager = userRepository.create({
      email: "manager@sapphire.com",
      password: managerPassword,
      role: UserRole.MANAGER,
    });
    await userRepository.save(manager);
    console.log("Manager seeded.");
  }

  const supervisorExists = await userRepository.findOne({ where: { email: "supervisor@sapphire.com" } });
  if (!supervisorExists) {
    const supervisorPassword = await hashPassword("password123");
    const supervisor = userRepository.create({
      email: "supervisor@sapphire.com",
      password: supervisorPassword,
      role: UserRole.SUPERVISOR,
    });
    await userRepository.save(supervisor);
    console.log("Supervisor seeded.");
  }

  // Seed Menu Items
  const itemsCount = await menuItemRepository.count();
  if (itemsCount === 0) {
    const items = [
      { name: "Classic Burger", currentPrice: 8.99, currentAvailability: true, description: "Juicy beef patty with lettuce and tomato." },
      { name: "Margherita Pizza", currentPrice: 12.50, currentAvailability: true, description: "Traditional pizza with fresh mozzarella and basil." },
      { name: "Caesar Salad", currentPrice: 7.00, currentAvailability: true, description: "Crisp romaine, parmesan, croutons, and Caesar dressing." },
      { name: "Spicy Wings", currentPrice: 9.99, currentAvailability: false, description: "10 pieces of hot wings with blue cheese dip." },
    ];

    for (const item of items) {
      const newItem = menuItemRepository.create(item);
      await menuItemRepository.save(newItem);
    }
    console.log("Menu items seeded.");
  }

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
