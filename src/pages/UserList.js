import React, { useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { userRows } from '../testData';
import { styled } from 'styled-components';


const UserListUser = styled.div`
    display: flex;
    align-items: center;
`;
const UserListImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;
const ButtonListEdit = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`;
const UserListDelete = styled.div`
    color: red;
    cursor: pointer;
`;
const UserListCont = styled.div`
    flex: 4;
`;





const UserList = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <UserListUser>
                        <UserListImg src={params.row.avatar} alt="" />
                        {params.row.username}
                    </UserListUser>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "transaction",
            headerName: "Transaction Volume",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                <>
                    <Link to={"/user/" + params.row.id}>
                    <ButtonListEdit>Edit</ButtonListEdit>
                    </Link>
                    <UserListDelete>
                        <DeleteOutline onClick={() => handleDelete(params.row.id)} />
                    </UserListDelete>
                </>
                );
            },
        },
  ];
    

    return (
        <UserListCont>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </UserListCont>
    );
}


export default UserList