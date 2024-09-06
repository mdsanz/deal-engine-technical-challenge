import mysql from 'mysql2/promise';
import "dotenv/config";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '3306')
  });
 
export const query = (text: string, params?: any[]) => pool.query(text, params);
