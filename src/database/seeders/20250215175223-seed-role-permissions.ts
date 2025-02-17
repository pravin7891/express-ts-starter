import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    // Fetch roles
    const [roles] = await queryInterface.sequelize.query('SELECT id, name FROM roles');
    const [permissions] = await queryInterface.sequelize.query('SELECT id, name FROM permissions');
    
    const rolePermissions: { roleId: number; permissionId: number; createdAt: Date; updatedAt: Date }[] = [];
    
    roles.forEach((role: any) => {
      if (role.name.toLowerCase() === 'admin') {
        return; // Admin has all permissions implicitly, so no need to insert
      }
      permissions.forEach((permission: any) => {
        if (role.name.toLowerCase() === 'editor' && !permission.name.includes('user.delete') && permission.name.indexOf('.assign') <= -1) {
          rolePermissions.push({
            roleId: role.id,
            permissionId: permission.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });
    });
  // ✅ Ensure we only insert if there are role-permission mappings
  if (rolePermissions.length > 0) {
    await queryInterface.bulkInsert('role_permissions', rolePermissions);
  }
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('role_permissions', {});
  },
};