import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Description = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    transition: all .5s ease;

    &:hover{
        transform: scale(1.1);
    }
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ display: "none" })};
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover{
        font-weight: 600;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ backgroundColor: "#fff8f8" })};
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>GLOW.</Logo>
                <Description>This is a desciption about the beauty and skincare products. Indulge yourself in our amazing skincare ranges.</Description>
                <SocialContainer>
                    <SocialIcon>
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon>
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon>
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon>
                        <Pinterest/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Skincare</ListItem>
                    <ListItem>Hydrating</ListItem>
                    <ListItem>Anti-aging</ListItem>
                    <ListItem>Basket</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight:"10px"}}/> 20 Parliament Road, Shoppington, QU1 EE5
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"10px"}}/> 01234 567 8910
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{marginRight:"10px"}}/> contact@shoponline.com
                </ContactItem>
                <Payment src="assets/images/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer;