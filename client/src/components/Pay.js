import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from "react-router";


const KEY = "pk_test_51NQYfTCeq3OZ0lEkygBOgz5ikHJZZZubRSscClD3j30Tj7RYU07rYS0oYxIFQeAlnHcTFsG0fKoCV2UdeMtYmTdW00AIi4UrNf";

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
border: "none;
width: 120px;
border-radius: 5%;
padding: 20px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;
`

const Pay = () => {
    const [stripeToken, setStripeToke] = useState(null);
    const history = useHistory();
    
    const onToken = (token) => {
        console.log(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment", {
                        tokenId: stripeToken.id,
                        amount: 2000
                    }
                );
                console.log(res.data);
                history.push("/success");
            } catch (err) {
                console.log(err)
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, history]);

    return (
        <Container>
            {stripeToken ? (<span>Processing. Please wait...</span>) : (
                <StripeCheckout 
                    name="Glow Shop"
                    image=""
                    billingAddress
                    shippingAddress
                    description = "Your total is $20"
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
            >
                    <Button>Pay Now</Button>
                </StripeCheckout>
            )} 
            
        </Container>
    );
};


export default Pay;