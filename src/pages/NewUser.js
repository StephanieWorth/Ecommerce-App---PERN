import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
    flex: 4;
`;
const NewUserTitle = styled.h1``;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const NewUserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`;
const Label = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
`;
const Input = styled.input`
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
`;
const NewUserGender = styled.div`
    margin-top: 15px;
`;

const GenderInput = styled.input`
    margin-top: 15px;
`;


const GenderLabel = styled.label`
    margin: 10px;
    font-size: 18px;
    color: #555;
`;

const Select = styled.select`
    height: 40px;
    border-radius: 5px;
`;


const Button = styled.button`
    width: 200px;
    border: none;
    background-color: darkblue;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`;


const NewUser = () =>{
    return (
        <Container>
            <NewUserTitle>New User</NewUserTitle>
            <Form>
                <NewUserItem>
                    <Label>Username</Label>
                    <Input type="text" placeholder="john" />
                </NewUserItem>
                <NewUserItem>
                    <Label>Full Name</Label>
                    <Input type="text" placeholder="John Smith" />
                </NewUserItem>
                <NewUserItem>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@gmail.com" />
                </NewUserItem>
                <NewUserItem>
                    <Label>Password</Label>
                    <Input type="password" placeholder="password" />
                </NewUserItem>
                <NewUserItem>
                    <Label>Phone</Label>
                    <Input type="text" placeholder="+1 123 456 78" />
                </NewUserItem>
                <NewUserItem>
                    <Label>Address</Label>
                    <Input type="text" placeholder="New York | USA" />
                </NewUserItem>
                <NewUserItem>
                    <GenderLabel>Gender</GenderLabel>
                    <NewUserGender>
                        <GenderInput type="radio" name="gender" id="male" value="male" />
                        <Label for="male">Male</Label>
                        <GenderInput type="radio" name="gender" id="female" value="female" />
                        <Label for="female">Female</Label>
                        <GenderInput type="radio" name="gender" id="other" value="other" />
                        <Label for="other">Other</Label>
                    </NewUserGender>
                </NewUserItem>
                <NewUserItem>
                    <Label>Active</Label>
                    <Select name="active" id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Select>
                </NewUserItem>
                <Button>Create</Button>
            </Form>
      </Container> 
    )
}

export default NewUser