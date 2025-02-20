require("dotenv").config(); // Load environment variables

const isPostgres = process.env.DB_DIALECT === "postgres";

module.exports = {
  development: {
    dialect: isPostgres ? "postgres" : "sqlite",
    storage: isPostgres ? undefined : process.env.DB_STORAGE,
    host: isPostgres ? process.env.DB_HOST : undefined,
    port: isPostgres ? process.env.DB_PORT : undefined,
    database: isPostgres ? process.env.DB_NAME : undefined,
    username: isPostgres ? process.env.DB_USER : undefined,
    password: isPostgres ? process.env.DB_PASS : undefined,
    logging: false,
  },
  production: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
  },
};
