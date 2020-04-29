module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "artgarden",
    "host": "localhost",
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
    "operatorsAliases": 0
  }
}
