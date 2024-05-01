// Arquivo para fazer a conexão com o Database
// Seguindo logica da aula 4.1
// Informações do db retiradas do docker-compose (Aula 4.1 @51min)

const mysql = require('mysql2/promise');

const conn = mysql.createPool({
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  host: 'db',
  port: 3306,
});

module.exports = conn;
