// config.js
require('dotenv').config();

const {DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DEV_DATABASE, DB_TEST_DATABASE} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DEV_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_TEST_DATABASE,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": "production",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
