import React from 'react';
import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';



const Container = styled.div`
    flex: 1,
    height: calc(100vh - 50px);
    background-color: rb(251, 251, 255);
    position: sticky;
    top: 50px;
`;


const Item = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Title = styled.span`
    font-size: 20px;
`;
const MoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`;
const Money = styled.span`
    font-size: 30px;
    font-weight: 600;
`;
const MoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;
const Sub = styled.span`
    font-size: 15px;
    color: gray;
`;

const Icon = styled.span`
    font-size: 14px;
    margin-left: 5px;
    color: ${props => props.direction === "up" && "green" || props.direction === "down" && "red" };
`;



const FeaturedInfo = () => {
    return (
        <Container>

            <Item>
                <Title>Revenue</Title>
                <MoneyContainer>
                    <Money>£2,415</Money>
                    <MoneyRate>
                        <Icon direction="down"><ArrowDownward /></Icon>
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>

            <Item>
                <Title>Sales</Title>
                <MoneyContainer>
                    <Money>£4,415</Money>
                    <MoneyRate>
                        <Icon direction="down"><ArrowDownward /></Icon>
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>

            <Item>
                <Title>Cost</Title>
                <MoneyContainer>
                    <Money>£2,785</Money>
                    <MoneyRate>
                        <Icon direction="up"><ArrowUpward /></Icon>
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>


        </Container>
    )
}


export default FeaturedInfo