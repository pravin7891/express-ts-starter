require("dotenv").config();
const path = require("path");

// // Fix the path to `database.ts` by using `path.resolve`
// const sequelize = require(path.resolve(__dirname, "./database")).default;
// Use compiled JavaScript version
const sequelize = require(path.resolve(__dirname, "../../dist/config/database")).default;

module.exports = {
  development: {
    dialect: sequelize.getDialect(),
    storage: sequelize.options.storage, // For SQLite
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "my_database",
    host: process.env.DB_HOST || "127.0.0.1",
  },
  production: {
    dialect: sequelize.getDialect(),
    storage: sequelize.options.storage,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
};
