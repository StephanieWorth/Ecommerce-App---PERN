const router = require('express').Router();
const pool = require('../db');
const isAdmin = require("../middleware/isAdmin");

//GET ALL PRODUCTS 
router.get("/products", async (req, res) => {
        try {
            const products = await pool.query("SELECT * FROM products");
            res.json(products.rows);
        } catch (err) {
            console.error(err.message);
        }
});

//CREATE PRODUCTS 
router.post("/products", isAdmin, async (req, res) => {
    try {
        const { name, description, img, size, color, price, category } = req.body;
        const addProduct = await pool.query("INSERT INTO products (name, description, img, size, color, price, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, description, img, size, color, price, category]);
        res.status(201).json(addProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//UPDATE PRODUCTS 
router.put("/products/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, img, size, color, price, category } = req.body;
        const updateProduct = await pool.query("UPDATE products SET name = $1, description = $2, img = $3, size = $4, color = $5, price = $6, category = $7 WHERE id = $8 RETURNING *", [name, description, img, size, color, price, category, id]);

        if (updateProduct.rows.length === 0) {
            return res.json("This product does not match product id");
        }
        res.status(200).json(updateProduct.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//DELETE PRODUCTS
router.delete("/products/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        if (deleteProduct.rows.length === 0) {
            return res.json("This product does not match product id");
        }
        res.status(200).json(deleteProduct.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

//GET PRODUCT BY ID - for all
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        res.status(200).json(product.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//GET ALL PRODUCTS - for all - wont work in postman
router.get("/products", async (req, res) => {
    const { newest, category } = req.query;
  
    try {
      let products;
  
      if (newest) {
        products = await pool.query(
          "SELECT * FROM products ORDER BY created DESC LIMIT 5"
        );
      } else if (category) {
        const query = 'SELECT * FROM products WHERE $1 = ANY (category) AND category @> ARRAY[$1]';
        products = await pool.query(query, [category]);
      } else {
        products = await pool.query("SELECT * FROM products");
      }
  
      res.status(200).json(products.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });
  
  
  
  
  
  



module.exports = router;