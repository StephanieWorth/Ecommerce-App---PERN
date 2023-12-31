import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId ] = useState(null);

    console.log(location);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser.id,
                    products: cart.products.map((item) => ({
                        productId: item.id,
                        quantity: item.qty
                    })),
                    amount: cart.total,
                    address: data.billing_details.address
                });
                setOrderId(res.data.id);
            } catch (error) {
                
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);


    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
    );
};

export default Success