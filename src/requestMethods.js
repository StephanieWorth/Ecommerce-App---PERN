import axios from "axios";

const BASE_URL = "http://localhost:5000/";

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTdjYzZjMDgtYjU3OC00MThjLTg5ZjMtYjQxOTM3ZmEzZDdkIiwiaXNhZG1pbiI6dHJ1ZX0sImlhdCI6MTY4OTYzOTY0NCwiZXhwIjoxNjg5NjU3NjQ0fQ.qX42eAWCGta0G8VorDHnD6rFhcJNTHXbrUuzwckG3ss";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 
        Authorization: `Bearer ${TOKEN}`,
    },
});