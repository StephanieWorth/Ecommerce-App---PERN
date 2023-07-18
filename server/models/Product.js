const pool = require('../db');


//get products by category
async function getProductsByCategory(category) {
    try {
      const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
 
//get newest products  
async function getNewestProducts() {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY created DESC LIMIT 5');
      return result.rows;
    } catch (error) {
      throw error;
    }
}


//get all products
async function getAllProducts() {
    try {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    } catch (error) {
      throw error;
    }
}

//get products by name search
async function getProductsByName(name) {
    try {
      const result = await pool.query("SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'", [name]);
      return result.rows;
    } catch (error) {
      throw error;
    }
}
  
module.exports = {
    getProductsByCategory,
    getNewestProducts,
    getAllProducts,
    getProductsByName
};