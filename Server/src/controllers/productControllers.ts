import { Request, Response } from "express";
import productServices from "../services/productServices"
import { AppResponse } from "../types";

// GET Requests
const getAllProducts = (req: Request, res: AppResponse) => {
    productServices.getAllProducts()
        .then(products => res.status(200).json({ status: 200, message: "Successful", data: products }))
        .catch(error => res.status(500).json({ status: 500, message: "Internal server error", error }))
}

const getProduct = (req: Request, res: Response) => {

}

// POST Requests
const createProduct = (req: Request, res: Response) => {

}

// PATCH Requests
const updateProduct = (req: Request, res: Response) => {

}

// DELETE Requests
const deleteProduct = (req: Request, res: Response) => {

}

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }