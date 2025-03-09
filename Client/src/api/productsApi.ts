import { baseUrl } from ".";
import axios from "axios";
import { CreateProductResponseType, GetProductsResponseType, GetSingleProductResponseType } from "../types/apiTypes";
import { NewProduct, Product } from "../types";
import { Axios } from "axios/";

export const fetchProducts: () => Axios.IPromise<Axios.AxiosXHR<GetProductsResponseType>> = () => {
    return axios.get<GetProductsResponseType>(`${baseUrl}/api/products`)
}

export const fetchSingleProduct: (id: number) => Axios.IPromise<Axios.AxiosXHR<GetSingleProductResponseType>> = (id) => {
    return axios.get<GetSingleProductResponseType>(`${baseUrl}/api/products/${id}`)
}

export const addProduct: (newProduct: NewProduct) => Axios.IPromise<Axios.AxiosXHR<CreateProductResponseType>> = ({ name, price, image }) => {
    return axios.post<CreateProductResponseType>(`${baseUrl}/api/products`, { name, price, image })
}

export const updateProduct: (product: Omit<Product, "updated_at" | "created_at">) => Axios.IPromise<Axios.AxiosXHR<GetSingleProductResponseType>> = ({ id, name, price, image }) => {
    return axios.patch<GetSingleProductResponseType>(`${baseUrl}/api/products/${id}`, { name, price, image })
}

export const deleteProduct: (id: number) => Axios.IPromise<Axios.AxiosXHR<void>> = (id) => {
    return axios.delete<void>(`${baseUrl}/api/products/${id}`)
}