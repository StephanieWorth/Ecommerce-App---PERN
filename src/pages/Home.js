import React from "react";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetSml from "../components/WidgetSml";
import WidgetLg from "../components/WidgetLg";
import { styled } from "styled-components";


const Container = styled.div`
    flex: 4;
`;
const Widgets = styled.div`
    display: flex;
    margin: 20px;
`;


const Home = () => {
    return (
        <Container>       
            <FeaturedInfo />
            <Chart data={"userData"} title="User Analytics" grid datakey="Active User" />
            <Widgets>
                <WidgetSml />
                <WidgetLg />
            </Widgets>
        </Container>
    )
}

export default Home