import { QueryInterface } from "sequelize";

const permissions = [
  // User Management
  'manage.user', 'create.user', 'read.user', 'update.user', 'delete.user',
  
  // Post Management
  'manage.post', 'create.post', 'read.post', 'update.post', 'delete.post',
  
  // Role Management
  'manage.role', 'create.role', 'read.role', 'update.role', 'delete.role',
  
  // Permission Management
  'read.permission',

  //RBAC
  'manage.rbac', 'assign.role', 'assign.permission'
];

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('permissions', permissions.map(name => ({ name, createdAt: new Date(), updatedAt: new Date() })));
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('permissions', {});
  },
};