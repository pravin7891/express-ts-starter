import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("role_permissions", {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "roles", key: "id" },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "permissions", key: "id" },
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
    await queryInterface.dropTable("role_permissions");
  },
};
