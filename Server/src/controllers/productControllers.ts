import { Request, Response } from "express";

// GET Requests
const getAllProducts = (req: Request, res: Response) => {
    res.send("this is for products")
}

// POST Requests
const createProduct = (req: Request, res: Response) => {
    
}

export { getAllProducts, createProduct }