import mysql from 'mysql2';
import fs from 'fs/promises';

const caFilePath = './clients/certificates/ca.pem';

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER, MYSQL_PORT } = process.env;

const dbConfig = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
  ssl: {
    ca: await fs.readFile(caFilePath, 'utf8'),
    rejectUnauthorized: true
  }
};

const connection = mysql.createConnection(dbConfig);

export default connection.promise();