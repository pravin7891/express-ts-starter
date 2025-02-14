import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./User";

interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Optional fields for model creation
interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "createdAt" | "updatedAt"> {}
//<RoleAttributes, RoleCreationAttributes> implements RoleAttributes
class Role extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "Role",
  }
);
setImmediate(() => {
Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId" });
});
export default Role;
