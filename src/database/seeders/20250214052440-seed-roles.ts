import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("roles", [
      { name: "Admin", createdAt: new Date(), updatedAt: new Date() }, // Example: Admin User
      { name: "Editor", createdAt: new Date(), updatedAt: new Date() }, // Example: Regular User
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("roles", {});
  },
};
