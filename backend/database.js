import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUser(username, password){
    const [result] = await pool.query(`
    SELECT * 
    FROM users 
    WHERE username = ? 
    AND passwordHash = ?
    `, [username, password])
    return result[0]
}

export async function createUser(username, email, password){
    await pool.query(`
    INSERT INTO users (username, email, passwordHash) 
    VALUES (?, ?, ?)
    `, [username, email, password])
    return getUser(username, password)
}
