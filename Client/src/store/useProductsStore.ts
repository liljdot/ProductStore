import { create } from "zustand";
import { deleteProduct, fetchProducts } from "../api/productsApi";
import { Product } from "../types";
import { DeleteProductError, GetProductsError } from "../types/apiTypes";
import { AxiosError } from "axios/";
import toast from "react-hot-toast";

interface ProductsStore {
    products: Product[]
    isLoading: boolean
    isError: boolean
    error: string | null
    fetchProducts: () => void
    deleteProductId: number | null
    deleteError: string | null
    deleteProduct: (id: number) => void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    isLoading: false,
    isError: false,
    error: null,
    fetchProducts: () => {
        set({ isLoading: true })
        fetchProducts()
            .then(res => {
                set({ products: res.data.data, isError: false, error: null })
            })
            .catch((err: AxiosError<GetProductsError>) => {
                console.log(err.response?.data.message)
                set({ isError: true, error: err.response?.data.message })
            })
            .then(() => set({ isLoading: false }))

    },
    deleteProductId: null,
    deleteIsLoading: false,
    deleteError: null,
    deleteProduct: (id) => {
        set({ deleteProductId: id })
        deleteProduct(id)
            .then(() => {
                set(prev => ({ products: prev.products?.filter(product => product.id != id) }))
                toast.success("Product has been deleted")
            })
            .catch((error: AxiosError<DeleteProductError>) => {
                console.log(error.response?.data.message)
                toast.error(error.response?.data.message || "Something went wrong")
            })
            .then(() => {
                set({ deleteProductId: null })
            })
    }
}))