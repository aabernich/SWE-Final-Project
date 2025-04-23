import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({  // Create a connection pool to interact with the MySQL database using credentials from .env
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

  export async function getProductById(id) {
    const [result] = await pool.query(`
      SELECT * 
      FROM products 
      WHERE id = ?
    `, [id]);
    return result[0];
  }

  export async function addToCart(userId, productId, size, color) {
    await pool.query(`
      INSERT INTO cart_items (user_id, product_id, size, color) 
      VALUES (?, ?, ?, ?)
    `, [userId, productId, size, color]);
  }

  export async function getCartItems(userId) {
    try {
      const [rows] = await pool.query(
        `
          SELECT 
            ci.id AS id,
            ci.product_id,
            ci.quantity,
            ci.size,
            ci.color,
            p.name,
            p.price,
            p.image
          FROM cart_items ci
          JOIN products p ON ci.product_id = p.id
          WHERE ci.user_id = ?
        `,
        [userId]
      );
  
      return rows;
    } catch (error) {
      console.error("Error fetching joined cart items:", error);
      throw error;
    }
  }

  export async function deleteCartItem(Id) {
    const [result] = await pool.query(`
      DELETE FROM cart_items 
      WHERE id = ?
    `, [Id]);
    return result.affectedRows > 0;
  }

  export async function leaveReview(productId, userId, rating, review) {
    const [result] = await pool.query(`
      INSERT INTO product_reviews (product_id, user_id, rating, comment) 
      VALUES (?, ?, ?, ?)
    `, [productId, userId, rating, review]);
    return result.affectedRows > 0;
  }

  export async function getReviews(productId) {
    const [result] = await pool.query(`
      SELECT r.rating, r.comment, u.username, u.id 
      FROM product_reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ?
    `, [productId]);
    return result;
  }

  export async function updateCartQuantity(id, quantity) {
    try {
      const [result] = await pool.query(
        `UPDATE cart_items SET quantity = ? WHERE id = ?`,
        [quantity, id]
      );
      return result;
    } catch (error) {
      console.error("Error updating quantity in cart:", error);
      throw error;
    }
  }

  export async function getPastPurchases(userId) {
    try {
      const [result] = await pool.query(
        `
        SELECT p.name, p.manufacturer, p.id
        FROM purchases pu
        JOIN products p ON pu.product_id = p.id
        WHERE pu.user_id = ?
        `,
        [userId]
      );
      return result;
    } catch (error) {
      console.error("Error finding past purchases", error);
      throw error;
    }
  }
  
  export async function emptyCart(userId){
    try{
        const [result] = await pool.query(
            `DELETE FROM cart_items 
            WHERE user_id = ?`,
            [userId]
        )
        return result.affectedRows > 0;
    } catch (error){
        console.error("Cart not emptied", error);
        throw error;
    }
  }

  export async function addPastPurchase(userId,productId){
    try{
        const [result] = await pool.query(
            `INSERT INTO purchases (user_id, product_id)
            VALUES (?, ?)`,[userId,productId])
        return result.affectedRows > 0;
    } catch (error){
        console.error("Cannot add Item", error);
        throw error;
    }
   }