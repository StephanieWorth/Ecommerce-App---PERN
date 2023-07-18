const router = require('express').Router();
const pool = require('../db');
const authAndAdmin = require('../middleware/authAndAdmin');
const authorize = require('../middleware/authorize');
const isAdmin = require('../middleware/isAdmin');


//CREATE CART
router.post("/carts", authAndAdmin, async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await pool.query("INSERT INTO carts (user_id) VALUES ($1) RETURNING *", [userId]);
        const newCart = result.rows[0];
        res.status(201).json(newCart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//UPDATE CART 
router.put("/carts/:id", authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, created } = req.body;
        const updatedCart = await pool.query("UPDATE carts SET user_id = $1, created = $2 WHERE id = $3 RETURNING *", [userId, created, id]);
        if (updatedCart.rows.length === 0) {
            return res.status(404).json("Cart not found")
        }
        res.status(200).json(updatedCart.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//DELETE CART
//this will automatically delete cartItems as well
router.delete("/carts/:id", authAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await pool.query("DELETE FROM carts WHERE id = $1", [id]);

        if (deletedCart.rows.length === 0) {
            return res.json("Cart not found")
        }

        res.status(200).json("Cart deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//GET USER CART
router.get("/carts/find/:userId", authAndAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const userCart = await pool.query("SELECT * FROM carts WHERE user_id = $1", [userId]);
        if (userCart.length === 0) {
            return res.status(404).json("Cart not found");
        }
        res.status(200).json(userCart.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//ADMIN GET ALL CARTS
router.get("/carts", isAdmin, async (req, res) => {
    try {
        const carts = await pool.query("SELECT * FROM carts");

        res.status(200).json(carts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//get cart by cart id
router.get("/carts/find/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
        
        if (cart.rows.length === 0) {
            return res.status(404).json("Cart not found");
        }

        res.status(200).json(cart.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//CART ITEM ROUTES

//GET ALL CART ITEMS FOR SPECIFIC CART
router.get("/carts/:cartId/cartItems", authAndAdmin, async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartItems = await pool.query("SELECT * FROM cartItems WHERE cart_id = $1", [cartId]);

    res.json(cartItems.rows);
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//GET CART ITEMS FOR USER
//get cart items for user
router.get("/carts/:userId/cartItems", authAndAdmin, async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query("SELECT cartItems.id, cartItems.qty, products.name, products.price FROM cartItems JOIN carts ON carts.id = cartItems.cart_id JOIN products ON products.id = cartItems.product_id WHERE carts.user_id = $1", [userId]);

        const cartItems = result.rows;

        res.json(cartItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//POST - ADD NEW CART ITEM TO SPECIFIC CART
/*router.post("/carts/:cartId/cartItems", authAndAdmin, async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, qty } = req.body;
    const newCartItem = await pool.query("INSERT INTO cartItems (cart_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *",
    [cartId, product_id, qty]);

    res.status(201).json(newCartItem.rows[0]);
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});*/

//POST - ADD NEW CART ITEM TO SPECIFIC CART
//if no cart exist, create cart, then add item
router.post("/carts/:cartId/cartItems", authAndAdmin, async (req, res) => {
    try {
      const { cartId } = req.params;
      const { product_id, qty } = req.body;
  
      // Check if the cart exists
      const cart = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
      let newCartId = cartId;
  
      if (cart.rows.length === 0) {
        // Cart does not exist, create a new cart and associate it with the user
        const user_id = req.user.id; // Assuming the user ID is available in the request
  
        const newCart = await pool.query(
          "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
          [user_id]
        );
  
        newCartId = newCart.rows[0].id;
      }
  
      // Add the new cart item to the specific cart
      const newCartItem = await pool.query(
        "INSERT INTO cartItems (cart_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *",
        [newCartId, product_id, qty]
      );
  
      res.status(201).json(newCartItem.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  

//PUT - UPDATE SPECIFIC CART ITEM IN A SPECIFIC CART
router.put("/carts/:cartId/cartItems/:itemId", authAndAdmin, async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { product_id, qty } = req.body;
    const updatedCartItem = await pool.query(
      "UPDATE cartItems SET product_id = $1, qty = $2 WHERE id = $3 AND cart_id = $4 RETURNING *",
      [product_id, qty, itemId, cartId]
    );
    if (updatedCartItem.rows.length === 0) {
      return res.status(404).json("Cart item not found");
    }
    res.json(updatedCartItem.rows[0]);
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//DELETE A SPECIFIC CART ITEM FROM A SPECIFIC GUEST CART
router.delete("/carts/:cartId/cartItems/:itemId", authAndAdmin, async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const deletedCartItem = await pool.query(
      "DELETE FROM cartItems WHERE id = $1 AND cart_id = $2 RETURNING *",
      [itemId, cartId]
    );
    if (deletedCartItem.rows.length === 0) {
      return res.status(404).json("Cart item not found");
    }
    res.json("Cart item deleted");
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});



module.exports = router;
