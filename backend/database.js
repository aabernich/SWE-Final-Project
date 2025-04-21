import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUser(email, password){
    const [result] = await pool.query(`
    SELECT * 
    FROM users 
    WHERE email = ? 
    AND passwordHash = ?
    `, [email, password])
    return result[0]
}

export async function createUser(username, email, password){
    await pool.query(`
    INSERT INTO users (username, email, passwordHash) 
    VALUES (?, ?, ?)
    `, [username, email, password])
    return getUser(username, password)
}

export async function filterProducts(sortOrder, selectedBrand, selectedCountry) {
    let query = `SELECT * FROM products WHERE 1=1`;
    let queryParams = [];
  
    if (selectedBrand !== 'all') {
      query += ' AND manufacturer = ?';
      queryParams.push(selectedBrand);
    }
  
    if (selectedCountry !== 'all') {
      query += ' AND country = ?';
      queryParams.push(selectedCountry);
    }
  
    query += ` ORDER BY price ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`
  
    try {
      const [results] = await pool.query(query, queryParams);
      return results;
    } catch (err) {
      console.error("Error executing query", err);
      throw err;
    }
  }

  export async function getAvailableFilters() {
    const [brandRows] = await pool.query("SELECT DISTINCT manufacturer FROM products");
    const [countryRows] = await pool.query("SELECT DISTINCT country FROM products");
  
    return {
      brands: brandRows.map(row => row.manufacturer),
      countries: countryRows.map(row => row.country),
    };
  }