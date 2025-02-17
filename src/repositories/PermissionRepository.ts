import RolePermission from "../database/models/RolePermission";
import Permission from "../database/models/Permission";
import BaseRepository from "./BaseRepository";

class PermissionRepository extends BaseRepository<Permission> {
    constructor() {
      super(Permission);
    }
    async getRolePermissions(roleId: number | Array<number>): Promise<string[]> {
      const permissions = await RolePermission.findAll({
          where: { roleId },
          include: [{ model: Permission, attributes: ['name'], as: 'permission' }]
      });
      return permissions.map(p => p.permission?.name ?? '');
  }
  async assignPermission(roleId: number, permissionId: number) {
    return await RolePermission.create({ role_id: roleId, permission_id: permissionId });
  }

  async removePermission(roleId: number, permissionId: number) {
    return await RolePermission.destroy({ where: { role_id: roleId, permission_id: permissionId } });
  }
}
export default new PermissionRepository();