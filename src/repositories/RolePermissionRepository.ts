import RolePermission from "../database/models/RolePermission";
import BaseRepository from "./BaseRepository";

export class RolePermissionRepository extends BaseRepository<RolePermission> {
    constructor() {
      super(RolePermission);
    }

  static async assignPermission(roleId: number, permissionId: number) {
    return await RolePermission.create({ role_id: roleId, permission_id: permissionId });
  }

  static async removePermission(roleId: number, permissionId: number) {
    return await RolePermission.destroy({ where: { role_id: roleId, permission_id: permissionId } });
  }

  static async getRolePermissions(roleId: number) {
    return await RolePermission.findAll({ where: { role_id: roleId } });
  }
}