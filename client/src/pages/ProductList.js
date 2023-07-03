import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement/Announcement";
import Products from "../components/Products/Products";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";

const Container = styled.div`

`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`;

const Option = styled.option`

`;

const ProductList = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Skincare</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select>
                        <Option disabled selected>
                            Skin Goals
                        </Option>
                        <Option>Dehydration</Option>
                        <Option>Fine Lines & Wrinkles</Option>
                        <Option>Breakouts & Acne</Option>
                        <Option>Barrier Repair/Damage</Option>
                        <Option>Redness</Option>
                        <Option>Pigmentation/Dark Spots</Option>
                        <Option>Visible Pores</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;