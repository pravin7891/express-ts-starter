import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('posts', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE },
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('posts');
}