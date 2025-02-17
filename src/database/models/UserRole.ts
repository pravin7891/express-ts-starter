import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../../config/database";
import Role from "./Role";

class UserRole extends Model {
  userId: number | undefined;
  roleId: number | undefined;
  public role?: Role;
  // ✅ Define association (optional for better type safety)
  public static associations: {
    role: Association<UserRole, Role>;
  }
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "user_roles",
    timestamps: true,
  }
);
setImmediate(() => {
  UserRole.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
  })
export default UserRole;
