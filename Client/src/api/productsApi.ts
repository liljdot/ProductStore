import { baseUrl } from ".";
import axios from "axios";
import { CreateProductResponseType, GetProductsResponseType, GetSingleProductResponseType } from "../types/apiTypes";
import { NewProduct, Product } from "../types";


export const fetchProducts = () => {
    return axios.get<GetProductsResponseType>(`${baseUrl}/api/products`)
}

export const fetchSingleProduct = (id: number) => {
    return axios.get<GetSingleProductResponseType>(`${baseUrl}/api/products/${id}`)
}

export const addProduct = ({ name, price, image }: NewProduct) => {
    return axios.post<CreateProductResponseType>(`${baseUrl}/api/products`, { name, price, image })
}

export const updateProduct = ({ id, name, price, image }: Omit<Product, "updated_at" | "created_at">) => {
    return axios.patch<GetSingleProductResponseType>(`${baseUrl}/api/products/${id}`, { name, price, image })
}

export const deleteProduct = (id: number) => {
    return axios.delete<void>(`${baseUrl}/api/products/${id}`)
}