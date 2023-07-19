import React from 'react';
import styled from "styled-components";
import { AttachMoney, BarChart, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TimelineOutlined, TrendingUp, WorkOutline,  } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Container = styled.div`
    flex: 1,
    height: calc(100vh - 50px);
    background-color: rb(251, 251, 255);
    position: sticky;
    top: 50px;
`;

const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`;


const Menu = styled.div`
    margin-bottom: 10px;
`;
const Title = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`;
const List = styled.ul`
    list-style: none;
    padding: 5px;
`;
const ListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;

    &:hover{
        background-color: rgb(240, 240, 255);
    }
    &:hover{
        background-color: rgb(240, 240, 255);
    }
`;
const Icon = styled.div`
    margin-right: 5px;
    font-size: 20px !important;
`;




const Sidebar = () => {
    return (
        <Container>
            <Wrapper>

                <Menu>
                    <Title>Dashboard</Title>
                    <List>
                        <Link to="/">
                            <ListItem>
                                <Icon><LineStyle /></Icon>
                                Home
                            </ListItem>
                        </Link>
                        <ListItem>
                                <Icon><Timeline /></Icon>
                                Analytics
                        </ListItem>
                        <ListItem>
                                <Icon><TrendingUp /></Icon>
                                Sales
                        </ListItem>
                    </List>
                </Menu>

                <Menu>
                    <Title>Quick Menu</Title>
                    <List>
                        <Link to="/users">
                            <ListItem>
                                <Icon><PermIdentity /></Icon>
                                Users
                            </ListItem>
                        </Link>
                        <Link to="/products">
                            <ListItem>
                                <Icon><Storefront /></Icon>
                                Products
                            </ListItem>
                        </Link>

                        <ListItem>
                                <Icon><AttachMoney /></Icon>
                                Transactions
                        </ListItem>
                        <ListItem>
                                <Icon><BarChart /></Icon>
                                Reports
                        </ListItem>
                        
                    </List>
                </Menu>

                <Menu>
                    <Title>Notifications</Title>
                    <List>
                        <ListItem>
                            <Icon><MailOutline /></Icon>
                            Mail
                        </ListItem>
                        
                        <ListItem>
                            <Icon><DynamicFeed /></Icon>
                            Feedback
                        </ListItem>

                        <ListItem>
                            <Icon><ChatBubbleOutline /></Icon>
                            Messages
                        </ListItem>
                    </List>
                </Menu>

                <Menu>
                    <Title>Staff</Title>
                    <List>
                        <ListItem>
                            <Icon><WorkOutline /></Icon>
                            Manage
                        </ListItem>

                        <ListItem>
                            <Icon><TimelineOutlined /></Icon>
                            Analytics
                        </ListItem>
                        
                        <ListItem>
                            <Icon><Report /></Icon>
                            Repots
                        </ListItem>
                    </List>
                </Menu>
            </Wrapper>
        </Container>
    )
}


export default Sidebar