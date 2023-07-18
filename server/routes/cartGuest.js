const router = require("express").Router();
const pool = require("../db");
const authAndAdmin = require('../middleware/authAndAdmin');
const isAdmin = require('../middleware/authAndAdmin');


//CREATE GUEST CART
router.post("/guestCarts", authAndAdmin, async (req, res) => {
  try {
      const { guestId } = req.body;
      const newGuestCart = await pool.query("INSERT INTO guestCarts (guest_id) VALUES ($1) RETURNING *", [guestId]);
      
      res.status(201).json(newGuestCart.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

//UPDATE  GUEST CART 
router.put("/guestCarts/:id", authAndAdmin, async (req, res) => {
  try {
      const { id } = req.params;
      const { guestId, created } = req.body;
      const updatedGuestCart = await pool.query("UPDATE guestCarts SET guest_id = $1, created = $2 WHERE id = $3 RETURNING *", [guestId, created, id]);
      if (updatedGuestCart.rows.length === 0) {
          return res.status(404).json("Guest cart not found")
      }
      res.status(200).json(updatedGuestCart.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});


//DELETE GUEST CART
//this will automatically delete cartItems as well
router.delete("/guestCarts:id", authAndAdmin, async (req, res) => {
  try {
      const { id } = req.params;
      const deletedGuestCart = await pool.query("DELETE FROM guestCarts WHERE id = $1", [id]);

      if (deletedGuestCart.rows.length === 0) {
          return res.json("Guest cart not found")
      }

      res.status(200).json("Guest cart deleted");
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//GET GUEST-USER CART
router.get("/guestCarts/find/:guestId", authAndAdmin, async (req, res) => {
  try {
      const { guestId } = req.params;
      const guestCart = await pool.query("SELECT * FROM guestCarts WHERE guest_id = $1", [guestId]);

      res.status(200).json(guestCart.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//ADMIN GET ALL GUEST CARTS
router.get("/guestCarts", isAdmin, async (req, res) => {
  try {
      const guestCarts = await pool.query("SELECT * FROM guestCarts");

      res.status(200).json(guestCarts);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//get cart by cart id
router.get("/guestCarts/find/:cartId", async (req, res) => {
  try {
      const { cartId } = req.params;
      const guestCart = await pool.query("SELECT * FROM guestCarts WHERE id = $1", [cartId]);
      
      if (guestCart.rows.length === 0) {
          return res.status(404).json("Cart not found");
      }

      res.status(200).json(guestCart.rows[0]);
      
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//CART ITEM ROUTES
//GET ALL CART ITEMS FOR SPECIFIC CART
router.get("/guestCarts/:cartId/cartItems", authAndAdmin, async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartItems = await pool.query("SELECT * FROM cartItems WHERE cart_id = $1", [cartId]);

    res.status(200).json(cartItems.rows);
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//CREATE CART ITEM
//POST - ADD NEW CART ITEM TO SPECIFIC CART
router.post("/guestCarts/:cartId/cartItems", authAndAdmin, async (req, res) => {
  try {
    const { cartId } = req.params; 
    const { product_id, qty } = req.body;

    const { guestId } = req.session;
    if (!guestId) {
      // Generate a new guestId or obtain it from any relevant logic
      const newGuestId = generateGuestId(); // Replace with your logic to generate a guestId
      req.session.guestId = newGuestId; // Store the new guestId in the session
    }


    //check if guestUser exist - if not create guestUser
    const guestUser = await pool.query("SELECT * FROM guestUsers WHERE id = $1")
      //if guest user does exist 
    //check if the guest cart exists
    const guestCart = await pool.query("SELECT * FROM guestCarts WHERE id = $1", [cartId]);

    if (guestCart.rows.length === 0) {
      //guestCart does not exist, create a new cart with guest user id
      await pool.query("INSERT INTO guestCarts (guest_id) VALUES ($1)", [guestId]);
    };

    //Add the new cartitem
    const newCartItem = await pool.query("INSERT INTO cartItems (cart_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *", [cartId, product_id, qty]);

    res.status(201).json(newCartItem.rows[0]);
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//PUT - UPDATE SPECIFIC CART ITEM IN A SPECIFIC CART
router.put("/guestCarts/:cartId/cartItems/:itemId", authAndAdmin, async (req, res) => {
  try {
    
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//DELETE A SPECIFIC CART ITEM FROM A SPECIFIC GUEST CART
router.delete("/guestCarts/:cartId/cartItems/:itemId", authAndAdmin, async (req, res) => {
  try {
    
  } catch (err) {
    console.error(err.message);
      res.status(500).send("Server Error");
  }
});


module.exports = router;