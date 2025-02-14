import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("user_roles", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "roles", key: "id" },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("user_roles");
  },
};
