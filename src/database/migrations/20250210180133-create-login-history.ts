import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('login_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      deviceName: {
        type: DataTypes.STRING
      },
      deviceOS: {
        type: DataTypes.STRING
      },
      ipAddress: {
        type: DataTypes.STRING
      },
      browserName: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
};

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('login_history');
}