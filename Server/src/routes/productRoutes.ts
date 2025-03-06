import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productControllers.js"

const productRoutes = express()

// GET Requests
productRoutes.get("/", getAllProducts)
productRoutes.get("/:id", getProduct)

// POST Requests
productRoutes.post("/", createProduct)

// PATCH Requests
productRoutes.patch("/:id", updateProduct)

// DELETE Requests
productRoutes.delete("/:id", deleteProduct)

export default productRoutes;