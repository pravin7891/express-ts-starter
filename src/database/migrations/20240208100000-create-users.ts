import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        profilePicture: { type: DataTypes.STRING, allowNull: true },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        verificationToken: { type: DataTypes.STRING,  allowNull: true },
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
}