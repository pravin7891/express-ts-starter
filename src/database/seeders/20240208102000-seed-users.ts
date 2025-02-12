import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export async function up(queryInterface: QueryInterface) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [
        { name: 'John Doe', email: 'john@example.com', password: hashedPassword, createdAt: new Date(), updatedAt: new Date() },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {});
}