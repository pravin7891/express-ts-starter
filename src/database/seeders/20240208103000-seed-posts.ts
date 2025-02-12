import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('posts', [
        { title: 'First Post', content: 'This is the first post content.', userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('posts', {});
}