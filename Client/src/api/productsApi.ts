import { baseUrl } from ".";
import axios from "axios";
import { GetProductsResponseType } from "../types/apiTypes";

export const fetchProducts: () => Axios.IPromise<Axios.AxiosXHR<GetProductsResponseType>> = () => {
    return axios.get<GetProductsResponseType>(`${baseUrl}/api/products`)
}