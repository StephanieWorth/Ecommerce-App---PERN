import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement/Announcement";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import { Add, Remove } from "@material-ui/icons";

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;

const ImgContainer =styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;  
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;    
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    
`;

const FilterSizeOption = styled.option`    
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`;


const ProductItem = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src="assets/images/good-skin-club.jpg" />
                </ImgContainer>
                <InfoContainer>
                    <Title>Good Skin Club</Title>
                    <Description>UltraHydrate Serum with Hyaluronic Acid and Essential Amino Acids.</Description>
                    <Price>£ 53</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            <FilterColor color="pink" />
                            <FilterColor color="orange" />
                            <FilterColor color="red" />
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                <FilterSizeOption>90ml</FilterSizeOption>
                                <FilterSizeOption>35ml</FilterSizeOption>
                                <FilterSizeOption>15ml</FilterSizeOption>
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{cursor:"pointer"}}/>
                            <Amount>1</Amount>
                            <Add style={{cursor:"pointer"}}/>
                        </AmountContainer>
                        <Button>ADD TO CART </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductItem;