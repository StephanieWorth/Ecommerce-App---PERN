import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`;

const Wrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex; 
    align-items: center;
    justify-content: space-between;
    
`;

const TopLeft = styled.div``;

const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: black;
    cursor: pointer;
`;
const TopRight = styled.div`
    display: flex;
    align-items: center;
`;

const TopbarIconCont = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;
`;
const TopIconBadge = styled.div`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const Topbar = () => {
    return (
        <Container>
            <Wrapper>
                <TopLeft>
                    <Logo>GLOW. dashboard</Logo>
                </TopLeft>
                <TopRight>
                    <TopbarIconCont>
                        Notifications
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIconCont>
                    <TopbarIconCont>
                        Language
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIconCont>
                    <TopbarIconCont>
                        Settings
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIconCont>
                    <Avatar src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                </TopRight>
            </Wrapper>
        </Container>
    )
}

export default Topbar