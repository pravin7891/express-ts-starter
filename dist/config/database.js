"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
exports.default = sequelize;
// import { Sequelize } from "sequelize";
// const sequelize = new Sequelize({
//   dialect: "sqlite", // or "mysql" / "postgres"
//   storage: "./database.sqlite", // Change based on your database
//   logging: false,
// });
// export default sequelize;
