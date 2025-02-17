import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../../config/database";
import Permission from "./Permission";

class RolePermission extends Model {
  public roleId: number | undefined;
  public permissionId: number | undefined;
  public permission?: Permission;

  // ✅ Define association (optional for better type safety)
  public static associations: {
      permission: Association<RolePermission, Permission>;
  }
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
      primaryKey: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "permissions", key: "id" },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "RolePermission",
    tableName: "role_permissions",
    timestamps: true,
  }
);
setImmediate(() => {
RolePermission.belongsTo(Permission, { foreignKey: 'permissionId', as: 'permission' });
})
export default RolePermission;
