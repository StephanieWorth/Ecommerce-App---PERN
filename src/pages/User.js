import React from "react";
import {
    CalendarToday,
    ContactMailOutlined,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { styled } from "styled-components";


const Container = styled.div`
    flex: 4;
    padding: 20px;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const UserTitle = styled.h1``;
const AddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
`;
const UserContainer = styled.div`
    display: flex;
    margin-top: 20px
`;
const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`;
const UserShowImg = styled.div``;

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;
const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;
const UserShowUsername = styled.span`
    font-weight: 600;
`;
const UserShowUserTitle = styled.span`
    font-weight: 300;
`;
const UserShowBottom = styled.div`
    margin-top: 20px;
`;
const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`;
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;
const Icon = styled.span`
    font-size: 16px !important;
`;
const UserShowInfoTitle = styled.span`
    margin-left: 10px;
`;
const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;
const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`;
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;`;
const UserUpdateLeft = styled.div``;

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`;
const Input = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`;
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;

const UpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;


const UpdateIcon = styled.span`
    cursor: pointer;
`;

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`;



const User = () => {
    return (
        <Container>
            <TitleContainer>
                <UserTitle>Edit User</UserTitle>
                <Link to="/newUser">
                    <AddButton className="userAddButton">Create</AddButton>
                </Link>
            </TitleContainer>
            <UserContainer>
                <UserShow>

                    <UserShowTop>
                        <UserShowImg>
                            <Img
                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
              
                            />
                        </UserShowImg>
                        <UserShowTopTitle>
                            <UserShowUsername>Anna Becker</UserShowUsername>
                            <UserShowUserTitle>Software Engineer</UserShowUserTitle>
                        </UserShowTopTitle>
                    </UserShowTop>

                    <UserShowBottom>
                        <UserShowTitle>Account Details</UserShowTitle>
                        <UserShowInfo>
                            <Icon><PermIdentity /></Icon>
                            <UserShowInfoTitle>annabeck99</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                           <Icon><CalendarToday /></Icon>
                            <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
                        </UserShowInfo>

                        <UserShowTitle>Contact Details</UserShowTitle>
                        <UserShowInfo>
                            <Icon><PhoneAndroid /></Icon>
                            <UserShowInfoTitle>+1 123 456 67</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <Icon><MailOutline /></Icon>
                            <UserShowInfoTitle>annabeck99@gmail.com</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <Icon><LocationSearching /></Icon>
                            <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
                        </UserShowInfo>
                    </UserShowBottom>

                </UserShow>

                <UserUpdate>
                    <UserUpdateTitle>Edit</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateLeft>
                            <UserUpdateItem>
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    placeholder="annabeck99"
                                    className="userUpdateInput"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Full Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Anna Becker"
                                    className="userUpdateInput"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    placeholder="annabeck99@gmail.com"
                                    className="userUpdateInput"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Phone</Label>
                                <Input
                                    type="text"
                                    placeholder="+1 123 456 67"
                                    className="userUpdateInput"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    placeholder="New York | USA"
                                    className="userUpdateInput"
                                />
                            </UserUpdateItem>
                        </UserUpdateLeft>

                        <UserUpdateRight>
                            <UserUpdateUpload>
                                <UpdateImg
                                    className="userUpdateImg"
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt=""
                                />
                                <Label htmlFor="file">
                                    <UpdateIcon><Publish /></UpdateIcon>
                                </Label>
                                <Input type="file" id="file" style={{ display: "none" }} />
                            </UserUpdateUpload>
                            <UpdateButton>Update</UpdateButton>
                        </UserUpdateRight>

                    </UserUpdateForm>
                </UserUpdate>
            </UserContainer>
        </Container>
    )
  }

export default User