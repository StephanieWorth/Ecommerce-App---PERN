import React from 'react';
import { Link } from "react-router-dom";
import { Chart } from "../components/Chart";
import { productData } from "..testData/";
import { Publish } from "@material-ui/icons";

const Container = styled.div`
    flex: 4;
    padding: 20px;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Title = styled.h1``;
const AddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;
const Top = styled.div`
    display: flex;
`;
const TopLeft = styled.div`
    flex: 1;
`;
const TopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const InfoTop = styled.div`
    display: flex;
    align-items: center;    
`;
const ProductName = styled.span`
    font-weight: 600;
`;
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`;
const InfoBottom = styled.div`
    margin-top: 10px;
`;
const InfoItem = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;
const InfoKey = styled.span``;
const InfoValue = styled.span`
    font-weight: 300;
`;
const Bottom = styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Form = styled.span`
    display: flex;
    justify-content: space-between;
`;
const FormLeft = styled.div`
    display: flex;
    flex-direction: column;
`;
const Label = styled.label`
    margin-bottom: 10px;
    color: gray;
`;
const FormRight = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const Button = styled.button`
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color:white;
    font-weight: 600;
    cursor: pointer;
`;
const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`;
const LeftInput = styled.input`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
`;

const LeftSelect = styled.select`
    margin-bottom: 10px;
`;

const UploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;





const Product = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Product</Title>
        <Link to="/newproduct">
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Top>
          <TopLeft>
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </TopLeft>
          <TopRight>
              <InfoTop>
                  <Img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                  <ProductName>Apple Airpods</ProductName>
              </InfoTop>
              <InfoBottom>
                  <InfoItem>
                      <InfoKey>id:</InfoKey>
                      <InfoValue>123</InfoValue>
                  </InfoItem>
                  <InfoItem>
                      <InfoKey>sales:</InfoKey>
                      <InfoValue>5123</InfoValue>
                  </InfoItem>
                  <InfoItem>
                      <InfoKey>active:</InfoKey>
                      <InfoValue>yes</InfoValue>
                  </InfoItem>
                  <InfoItem>
                      <InfoKey>in stock:</InfoKey>
                      <InfoValue>no</InfoValue>
                  </InfoItem>
              </InfoBottom>
          </TopRight>
      </Top>
      <Bottom>
          <Form>
              <FormLeft>
                  <Label>Product Name</Label>
                  <LeftInput type="text" placeholder="Apple AirPod" />
                  <Label>In Stock</Label>
                  <LeftSelect name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </LeftSelect>
                  <Label>Active</Label>
                  <LeftSelect name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </LeftSelect>
              </FormLeft>
              <FormRight>
                  <ProductUpload>
                      <UploadImg src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                      <Label for="file">
                          <Publish/>
                      </Label>
                      <Input type="file" id="file" style={{display:"none"}} />
                  </ProductUpload>
                  <Button>Update</Button>
              </FormRight>
          </Form>
      </Bottom>
    </Container>
  );
}