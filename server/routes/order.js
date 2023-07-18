const router = require("express").Router();
const pool = require("../db");
const authAndAdmin = require("../middleware/authAndAdmin");
const isAdmin = require("../middleware/isAdmin");


//STATS FOR ORDERS

//GET MONTHLY INCOME
router.get("orders/income", isAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        const income = await pool.query(
            `SELECT
              EXTRACT(MONTH FROM created) AS month,
              SUM(total) AS total
            FROM orders
            WHERE created >= $1
            GROUP BY month`,
            [previousMonth]
          );

        res.status(200).json(income.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//CREATE NEW ORDER
router.post("/orders", authAndAdmin, async (req, res) => {
    try {
        const { total, user_id, address } = req.body;
        const newOrder = await pool.query("INSERT INTO orders (total, user_id, address) VALUES ($1, $2, $3) RETURNING *", [total, user_id, address]);

        res.status(201).json(newOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
});

//UPDATE ORDER 
router.put("/orders/:id", authAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { total, status, userId, address, created } = req.body;
        const updatedCart = await pool.query("UPDATE carts SET total = $1, status = $2, user_id = $3, address = $4, created = $5 WHERE id = $6 RETURNING *", [total, status, userId, address, created, id]);
        if (updatedCart.rows.length === 0) {
            return res.status(404).json("Cart not found")
        }
        res.status(200).json(updatedCart.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//DELETE ORDER
//need to delete order items associated with order
router.delete("/orders/:id", authAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await pool.query("DELETE FROM orders WHERE id = $1", [id]);

        if (deletedCart.rows.length === 0) {
            return res.json("Cart not found")
        }

        res.status(200).json("Cart deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//GET USER ORDERS
router.get("/orders/find/:userId", authAndAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const userOrder = await pool.query("SELECT * FROM Orders WHERE user_id = $1", [userId]);
        if (userOrder.length === 0) {
            return res.status(404).json("Order not found");
        }
        res.status(200).json(userOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//ADMIN GET ALL ORDERS
router.get("/orders", isAdmin, async (req, res) => {
    try {
        const orders = await pool.query("SELECT * FROM orders");

        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//get order by order id
router.get("/orders/find/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderById = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
        
        if (orderById.rows.length === 0) {
            return res.status(404).json("Cart not found");
        }

        res.status(200).json(orderById.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//ORDER ITEM ROUTES

//GET ALL ORDER ITEMS FOR SPECIFIC ORDER
router.get("/orders/:orderId/orderItems", authAndAdmin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderItems = await pool.query("SELECT * FROM orderItems WHERE order_id = $1", [orderId]);
  
      res.json(orderItems.rows);
    } catch (err) {
      console.error(err.message);
        res.status(500).send("Server Error");
    }
  });
  
  //GET ORDER ITEMS FOR USER
  //get order items for user
  router.get("/orders/:userId/orderItems", authAndAdmin, async (req, res) => {
      try {
          const { userId } = req.params;
  
          const result = await pool.query("SELECT orderItems.id, orderItems.qty, products.name, products.price FROM orderItems JOIN orders ON orders.id = orderItems.order_id JOIN products ON products.id = orderItems.product_id WHERE orders.user_id = $1", [userId]);
  
          const cartItems = result.rows;
  
          res.json(orderItems);
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

  //POST - ADD NEW ORDER ITEM TO SPECIFIC ORDER
  //if no order created, create order then add order item
  router.post("/orders/:orderId/orderItems", authAndAdmin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { product_id, qty, price } = req.body;
  
      // Check if the order exists
      const order = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
      let newOrderId = orderId;
  
      if (order.rows.length === 0) {
        // order does not exist, create a new order and associate it with the user
        const user_id = req.user.id; // Assuming the user ID is available in the request
  
        const newOrder = await pool.query(
          "INSERT INTO order (user_id) VALUES ($1) RETURNING id",
          [user_id]
        );
  
        newOrderId = newOrder.rows[0].id;
      }
  
      // Add the new order item to the specific order
      const newOrderItem = await pool.query(
        "INSERT INTO orderItems (order_id, product_id, qty, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [newOrderId, product_id, qty, price]
      );
  
      res.status(201).json(newOrderItem.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  
  //PUT - UPDATE SPECIFIC ORDER ITEM IN A SPECIFIC ORDER
  router.put("/orders/:orderId/orderItems/:itemId", authAndAdmin, async (req, res) => {
    try {
      const { orderId, itemId } = req.params;
      const { product_id, qty, price } = req.body;
      const updatedOrderItem = await pool.query(
        "UPDATE cartItems SET product_id = $1, qty = $2, price = $3 WHERE id = $4 AND order_id = $5 RETURNING *",
        [product_id, qty, price, itemId, orderId]
      );
      if (updatedOrderItem.rows.length === 0) {
        return res.status(404).json("Order item not found");
      }
      res.json(updatedOrderItem.rows[0]);
    } catch (err) {
      console.error(err.message);
        res.status(500).send("Server Error");
    }
  });
  
  //DELETE A SPECIFIC ORDER ITEM FROM A SPECIFIC ORDER
  router.delete("/orders/:orderId/orderItems/:itemId", authAndAdmin, async (req, res) => {
    try {
      const { orderId, itemId } = req.params;
      const deletedOrderItem = await pool.query(
        "DELETE FROM orderItems WHERE id = $1 AND order_id = $2 RETURNING *",
        [itemId, orderId]
      );
      if (deletedOrderItem.rows.length === 0) {
        return res.status(404).json("Order item not found");
      }
      res.json("Order item deleted");
    } catch (err) {
      console.error(err.message);
        res.status(500).send("Server Error");
    }
  });

module.exports = router;