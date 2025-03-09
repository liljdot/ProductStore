import { useParams } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";
import { useEffect, useState } from "react";
import { Product } from "../types";

const ProductPage: React.FC = () => {
    const {id} = useParams()
    const {fetchSingleProduct, isLoading, error, isError, currentProduct} = useProductsStore()
    
    useEffect(() => {
        fetchSingleProduct(Number(id))
    }, [])
    return (
        <>
            {isLoading ? <h1>Loading...</h1> : isError ? <h1>{error}</h1> : <h1>{currentProduct?.name}</h1>}
        </>
    )
}

export default ProductPage;