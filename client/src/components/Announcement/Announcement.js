import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";


const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.5px;

    ${mobile({ fontSize: "12px", letterSpacing: "0px"})}
`;

const Announcement = () => {
    return (
        <Container>
            Enjoy 15% Off Your First Order Using Code FIRST15
        </Container>
    );
};

export default Announcement;