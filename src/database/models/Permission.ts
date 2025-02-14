import { Model, DataTypes, Optional } from "sequelize";
import sequelize from '../../config/database';

interface PermissionAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Optional fields for model creation
interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id" | "createdAt" | "updatedAt"> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
    Permission.init(
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
        tableName: "permissions",
        modelName: "Permission",
      }
    );


export default Permission;