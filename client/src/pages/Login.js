import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement/Announcement";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";




const MainContainer = styled.div`

`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("assets/images/glossier.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 38px;
`;

const Wrapper = styled.div`
    width: 30%;
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
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid lightgray;
`;


const Button = styled.button`
    width: 100%;
    border: none;
    padding: 10px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 25px
    &:disabled{
        color: gray;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    color: gray;
    font-weight: ${(props) => props.type === "account" && "bold"};
    letter-spacing: ${(props) => props.type === "account" && "1px"};
`;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
    };

    return (
        <MainContainer>
            <Announcement />
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Label>Email *</Label>
                        <Input  onChange={(e) => setEmail(e.target.value)} />
                        <Label>Password *</Label>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button onClick={handleClick} disabled={isFetching}>SIGN IN</Button>
                        {error && <Error>Something went wrong</Error>}
                        <Link>Forgot Password?</Link>
                        <Link type="account">CREATE CUSTOMER ACCOUNT</Link>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </MainContainer>
    )
}

export default Login;