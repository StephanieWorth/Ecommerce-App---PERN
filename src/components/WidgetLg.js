import React from "react";
import { styled } from "styled-components";


const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`;

const Button = styled.button`
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    background-color: ${props => (props.type === "Approved" && "#e5faf2") || (props.type === "Declined" && "#fff0f1") || (props.type === "Pending" && "#ebf1fe")};
    color: ${props => (props.type === "Approved" && "#3bb077") || (props.type === "Declined" && "#d95087") || (props.type === "Pending" && "##2a7ade")};
`;
const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
`;
const Table = styled.table`
    width: 100%;
    border-spacing: 20px;
`;
const TableRow = styled.tr``;

const TableHead = styled.th`
    text-align: left;
`;
const TableData = styled.td``;

const TableUser = styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const TableAmount = styled.td`
    font-weight: 300;
`;

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;
const Name = styled.span``;



const WidgetLg = () => {
    const Button = ({ type }) => {
        return <Button>{type}</Button>
    }
    return (
        <Container>
            <Title>Latest transactions</Title>
            <Table>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>

                <TableRow>
                    <TableUser name="user">
                        <Img 
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                        />
                        <Name>Amelia Fayers</Name>
                    </TableUser>
                    <TableData name="date">2 June 2022</TableData>
                    <TableAmount name="amount">£122.00</TableAmount>
                    <TableData name="status">
                        <Button type="Approved"></Button>
                    </TableData>
                </TableRow>

                <TableRow>
                    <TableUser name="user">
                        <Img 
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                        />
                        <Name>Amelia Fayers</Name>
                    </TableUser>
                    <TableData name="date">2 June 2022</TableData>
                    <TableAmount name="amount">£122.00</TableAmount>
                    <TableData name="status">
                        <Button type="Declined"></Button>
                    </TableData>
                </TableRow>

                <TableRow>
                    <TableUser name="user">
                        <Img 
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                        />
                        <Name>Amelia Fayers</Name>
                    </TableUser>
                    <TableData name="date">2 June 2022</TableData>
                    <TableAmount name="amount">£122.00</TableAmount>
                    <TableData name="status">
                        <Button type="Pending"></Button>
                    </TableData>
                </TableRow>

                <TableRow>
                    <TableUser name="user">
                        <Img 
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                        />
                        <Name>Amelia Fayers</Name>
                    </TableUser>
                    <TableData name="date">2 June 2022</TableData>
                    <TableAmount name="amount">£122.00</TableAmount>
                    <TableData name="status">
                        <Button type="Approved"></Button>
                    </TableData>
                </TableRow>

            </Table>
        
        </Container>
    )
}


export default WidgetLg