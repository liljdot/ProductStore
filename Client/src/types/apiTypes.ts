import { Product } from "."

export interface GetProductsResponseType {
    status: number
    message: string
    data: Product[]
}

export interface GetSingleProductResponseType {
    status: number
    message: string
    data: Product
}

export interface CreateProductResponseType {
    status: number
    message: string
    data: Product
}

export interface CreateProductError {
    status: number
    message: string
    error: any
}

export interface GetProductsError {
    status: number
    message: string
    error: any
}

export interface DeleteProductError {
    status: number
    message: string
    error: any
}