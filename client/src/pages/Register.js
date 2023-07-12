import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement/Announcement";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { mobile } from "../responsive";

const MainContainer =styled.div`

`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("assets/images/glossier-pink.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 38px;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 50px 15px bisque;

    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    
`;

const Label = styled.label`
    color: gray;
    font-weight: 100;
    margin-bottom: -5px;
    margin-top: 10px;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 30px 0px 0px;
    padding: 10px;
    border: 1px solid lightgray;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 10px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-top: 20px;
`;

const Register = () => {
    return (
        <MainContainer>
            <Announcement />
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>CREATE CUSTOMER ACCOUNT</Title>
                    <Form>
                        <Label>First Name *</Label>
                        <Input required/>
                        <Label>Last Name *</Label>
                        <Input required/>
                        <Label>Email *</Label>
                        <Input required/>
                        <Label>Password *</Label>
                        <Input required/>
                        <Label>Confirm Password *</Label>
                        <Input required/>
                        
                        <Button>CREATE ACCOUNT</Button>
                        <Agreement>
                            By creating an account, I consent to the processing of
                            my personal data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </MainContainer>
    )
}

export default Register;