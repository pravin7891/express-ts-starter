import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";

class RolePermission extends Model {}

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

export default RolePermission;
