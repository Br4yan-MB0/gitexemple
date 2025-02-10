import mysql from 'mysql2/promise';
import fs from 'fs';

const pool = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  port: 10920, // Porta de comunicação correta
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 segundos de timeout
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA),
  },
});

export default pool;