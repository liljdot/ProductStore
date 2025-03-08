import { create } from "zustand";
import { fetchProducts } from "../api/productsApi";
import { Product } from "../types";
import { GetProductsError } from "../types/apiTypes";
import { AxiosError } from "axios/";

interface ProductsStore {
    products: Product[] | null
    isLoading: boolean
    isError: boolean
    error: any
    fetchProducts: () => void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: null,
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

    }
}))