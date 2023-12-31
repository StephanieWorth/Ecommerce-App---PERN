import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement/Announcement";
import Footer from "../components/Footer/Footer";
import { Add, DeleteOutlineOutlined, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 20px;
    margin-top: 33px;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
    transition: all .5s ease;

    &:hover{
        transform: scale(1.1);
    }
`
const TopTexts = styled.div`
    ${mobile({ display: "none"})} 
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
    margin-right: 30px;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`
    
`;

const ProductId = styled.span`

`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`;

const ProductSize = styled.span`

`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin: 0px 5px;

    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 24px;
    font-weight: 400;

    ${mobile({ marginBottom: "20px" })}
`;

const ProductDelete = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 24px;
    margin-top: 20px;
    margin-right: 30px;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h2`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span`

`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all .5s ease;

    &:hover{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    };

    console.log(stripeToken);

    useEffect(() =>{
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                history.push("/success", { 
                    stripeData: res.data,
                    products: cart, });
            } catch (err) {   
            }
        };
        stripeToken && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, history]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        
                        {cart.products.map((product) => (
                            <>
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img}/>
                                    <Details>
                                        <ProductName><b>Product:</b> {product.name}</ProductName>
                                        <ProductId><b>ID:</b> {product.id}</ProductId>
                                        <ProductColor color={product.color}/>
                                        <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add style={{cursor:"pointer"}}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove style={{cursor:"pointer"}} />
                                    </ProductAmountContainer>
                                    <ProductPrice>£ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                                <ProductDelete>
                                    <DeleteOutlineOutlined style={{cursor:"pointer"}}/>
                                </ProductDelete>
                            </Product>

                            <Hr/>
                            </>
                        ))}

                       
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>£ 5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Discount</SummaryItemText>
                            <SummaryItemPrice>£ -5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <StripeCheckout 
                            name="Glow Shop"
                            image=""
                            billingAddress
                            shippingAddress
                            description = {`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>Pay Now</Button>
                        </StripeCheckout>                    
                    </Summary>    
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart;