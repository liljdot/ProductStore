import { Product } from "."

export interface GetProductsResponseType {
    status: number
    message: string
    data: Product[]
}

export interface GetProductsError {
    status: number
    message: string
    error: any
}