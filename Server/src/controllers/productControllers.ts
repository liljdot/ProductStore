import { Request, Response } from "express";
import productServices from "../services/productServices"
import { AppResponse } from "../types";
import { checkImageError, checkNameError, checkPriceError } from "../UtilFns/reqData";

// GET Requests
const getAllProducts = (req: Request, res: AppResponse) => {
    productServices.getAllProducts()
        .then(products => res.status(200).json({ status: 200, message: "Successful", data: products }))
        .catch(error => {
            console.log("Error getAllProducts", error)
            res.status(500).json({ status: 500, message: "Internal server error", error })
        })
}

const getProduct = (req: Request, res: Response) => {

}

// POST Requests
const createProduct = (req: Request, res: AppResponse) => {
    const { name, image, price } = req.body
    const errors: string[] = []
    let isError = false

    // check for input errors before querying db
    isError = checkNameError(name, errors) || isError
    isError = checkImageError(image, errors) || isError
    isError = checkPriceError(price, errors) || isError

    if (isError) {
        console.log("Error createProduct", errors)
        return res.status(400).json({ status: 400, message: "Please input all fields correctly", error: errors })
    }

    productServices.createProduct(name, image, price)
        .then(newProduct => res.status(201).json({ status: 201, message: "Product created successfully", data: newProduct }))
        .catch(error => {
            console.log("Error createProduct", error)
            return res.status(500).json({ status: 500, message: "Internal server error", error })
        })
}

// PATCH Requests
const updateProduct = (req: Request, res: Response) => {

}

// DELETE Requests
const deleteProduct = (req: Request, res: Response) => {

}

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }