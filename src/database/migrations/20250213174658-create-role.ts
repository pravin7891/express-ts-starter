'use strict';

import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
};

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('roles');
}