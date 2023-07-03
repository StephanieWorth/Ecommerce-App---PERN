import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement/Announcement";
import Footer from "../components/Footer/Footer";
import { Add, DeleteOutlineOutlined, Remove } from "@material-ui/icons";

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 20px;
    margin-top: 33px;
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

`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Info = styled.div`
    flex: 3;
    margin-right: 30px;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
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
`;

const ProductPrice = styled.div`
    font-size: 24px;
    font-weight: 400;
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
                        <Product>
                            <ProductDetail>
                                <Image src="assets/images/fabulous.jpg"/>
                                <Details>
                                    <ProductName><b>Product:</b> FABULOUS HYDRATING SERUM</ProductName>
                                    <ProductId><b>ID:</b> 64739000329</ProductId>
                                    <ProductColor color="orange"/>
                                    <ProductSize><b>Size:</b> 90ml</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add style={{cursor:"pointer"}}/>
                                    <ProductAmount>2</ProductAmount>
                                    <Remove style={{cursor:"pointer"}} />
                                </ProductAmountContainer>
                                <ProductPrice>£ 57</ProductPrice>
                            </PriceDetail>
                            <ProductDelete>
                                <DeleteOutlineOutlined style={{cursor:"pointer"}}/>
                            </ProductDelete>
                        </Product>

                        <Hr/>

                        <Product>
                            <ProductDetail>
                                <Image src="assets/images/tatcha.jpg"/>
                                <Details>
                                    <ProductName><b>Product:</b> FABULOUS HYDRATING SERUM</ProductName>
                                    <ProductId><b>ID:</b> 64739000330</ProductId>
                                    <ProductColor color="red"/>
                                    <ProductSize><b>Size:</b> 35ml</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add style={{cursor:"pointer"}}/>
                                    <ProductAmount>1</ProductAmount>
                                    <Remove style={{cursor:"pointer"}}/>
                                </ProductAmountContainer>
                                <ProductPrice>£ 62</ProductPrice>
                            </PriceDetail>
                            <ProductDelete>
                                <DeleteOutlineOutlined style={{cursor:"pointer"}}/>
                            </ProductDelete>
                        </Product>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>£ 119</SummaryItemPrice>
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
                            <SummaryItemPrice>£ 119</SummaryItemPrice>
                        </SummaryItem>

                        <Button>CHECKOUT</Button>                    
                    </Summary>    
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart;