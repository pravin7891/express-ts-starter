import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";

class UserRole extends Model {}

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

export default UserRole;
