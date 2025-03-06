import { Request } from "express";
import productServices from "../services/productServices.js"
import { AppResponse } from "../types";
import { checkImageError, checkNameError, checkPriceError } from "../UtilFns/reqData/index.js";

// GET Requests
const getAllProducts = (req: Request, res: AppResponse) => {
    productServices.getAllProducts()
        .then(products => res.status(200).json({ status: 200, message: "Successful", data: products }))
        .catch(error => {
            console.log("Error getAllProducts", error)
            res.status(500).json({ status: 500, message: "Internal server error", error })
        })
}

const getProduct = (req: Request, res: AppResponse) => {
    const { id } = req.params

    productServices.getProduct(Number(id))
        .then(product => !product ? res.status(404).json({ status: 404, message: "Product does not exist", error: `Product with id: ${id} does not exist in database` })
            : res.status(200).json({ status: 200, message: "Successful", data: product }))
        .catch(error => {
            console.log("Error getProduct", error)
            res.status(500).json({ status: 500, message: "Internal Server Error", error })
        })
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
const updateProduct = (req: Request, res: AppResponse) => {
    const { id } = req.params
    const { name, image, price } = req.body
    let isError = false
    const errors: string[] = []

    if (name) {
        isError = checkNameError(name, errors) || isError
    }

    if (image) {
        isError = checkImageError(image, errors) || isError
    }

    if (price) {
        isError = checkPriceError(price, errors) || isError
    }

    if (isError) {
        console.log("Error updateProduct", errors)
        return res.status(400).json({ status: 400, message: "Please input all the fields correctly", error: errors })
    }

    productServices.getProduct(Number(id))
        .then(product => !product ? Promise.reject({ status: 404, message: "Product does not exist", error: `Product with id: ${id} does not exist in database` })
            : productServices.updateProduct(Number(id), name || product.name, image || product.image, price || product.price))
        .then(updatedProduct => res.status(201).json({ status: 201, message: "Successfully updated product", data: updatedProduct }))
        .catch(error => {
            console.log("Error updateProduct", error.error || error)
            res.status(error.status || 500).json({status: error.status || 500, message: error.message || "Internal server error", error: error.error || error})
        })
}

// DELETE Requests
const deleteProduct = (req: Request, res: AppResponse) => {
    const { id } = req.params
    productServices.getProduct(Number(id))
        .then(product => !product ? Promise.reject({ status: 404, message: "Product does not exist", error: `Product with id: ${id} does not exist in database` })
    : productServices.deleteProduct(Number(id)))
    .then(() => {
        res.status(204).json({status: 204, message: ""})
    })
    .catch(error => {
        console.log("Error deleteProduct", error.error || error)
        res.status(error.status || 500).json({status: error.status || 500, message: error.message || "Internal server error", error: error.error || error})
    })
}

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }