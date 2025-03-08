import { baseUrl } from ".";
import axios from "axios";
import { GetProductsResponseType } from "../types/apiTypes";

export const fetchProducts: () => Axios.IPromise<Axios.AxiosXHR<GetProductsResponseType>> = () => {
    return axios.get<GetProductsResponseType>(`${baseUrl}/api/products`)
}

export const deleteProduct: (id: number) => Axios.IPromise<Axios.AxiosXHR<void>> = (id) => {
    return axios.delete<void>(`${baseUrl}/api/products/${id}`)
}