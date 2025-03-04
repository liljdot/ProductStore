import express from "express"
import { createProduct, getAllProducts } from "../controllers/productControllers"

const productRoutes = express()

// GET Requests
productRoutes.get("/", getAllProducts)

// POST Requests
productRoutes.post("/", createProduct)

export default productRoutes;