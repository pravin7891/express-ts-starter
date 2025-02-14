import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("user_roles", [
      { userId: 1, roleId: 1, createdAt: new Date(), updatedAt: new Date() }, // Example: Admin User
      { userId: 2, roleId: 2, createdAt: new Date(), updatedAt: new Date() }, // Example: Regular User
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("user_roles", {});
  },
};
