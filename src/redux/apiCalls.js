import { publicRequest, userRequest } from "../requestMethods.js";
import { 
    deleteProductsFailure, 
    deleteProductsStart, 
    deleteProductsSuccess, 
    getProductsFailure, 
    getProductsStart, 
    getProductsSuccess,
    updateProductsFailure, 
    updateProductsStart, 
    updateProductsSuccess, 
    addProductsFailure, 
    addProductsStart, 
    addProductsSuccess,
} from "./productSlice.js";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductsStart());
    try {
        //const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductsSuccess(id));
    } catch (err) {
        dispatch(deleteProductsFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductsStart());
    try {
        //UPDATE
        dispatch(updateProductsSuccess({id, product }));
    } catch (err) {
        dispatch(updateProductsFailure());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductsStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(addProductsSuccess(res.data));
    } catch (err) {
        dispatch(addProductsFailure());
    }
};