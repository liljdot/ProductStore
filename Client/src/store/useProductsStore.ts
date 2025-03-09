import { create } from "zustand";
import { addProduct, deleteProduct, fetchProducts, fetchSingleProduct } from "../api/productsApi";
import { Product } from "../types";
import { CreateProductError, DeleteProductError, GetProductsError } from "../types/apiTypes";
import { AxiosError } from "axios/";
import toast from "react-hot-toast";
import { ChangeEvent, EventHandler, FormEvent } from "react";

const modalElement = document.getElementById("add_product_modal") as HTMLDialogElement

interface ProductsStore {
    products: Product[]
    isLoading: boolean
    isError: boolean
    error: string | null
    fetchProducts: () => void
    currentProduct?: Product
    fetchSingleProduct: (id: number) => void
    newProductFormData: {
        name: string
        price: number
        image: string
    }
    setNewProductFormData: EventHandler<ChangeEvent<HTMLInputElement>>
    resetNewProductForm: () => void
    createProductIsLoading: boolean
    createProductError: string | null
    createProduct: EventHandler<FormEvent>
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
        set({ isLoading: true, isError: false, error: null })
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
    fetchSingleProduct: id => {
        set({ isLoading: true, isError: false, error: null })
        let product = get().products.find(product => product.id == id)

        if (product) {
            return set({ isLoading: false, currentProduct: product })
        }

        fetchSingleProduct(id)
            .then(res => product = res.data.data)
            .catch((error: AxiosError<GetProductsError>) => {
                console.log(error.response?.data.message)
                set({ isError: true, error: error.response?.data.message })
            })
            .then(() => set({ isLoading: false, currentProduct: product }))
    },
    newProductFormData: {
        name: "",
        price: 0,
        image: ""
    },
    setNewProductFormData: e => {
        set(prev => ({ newProductFormData: { ...prev.newProductFormData, [e.target.name]: e.target.name == "price" ? Number(e.target.value) : e.target.value } }))
    },
    resetNewProductForm: () => set({ newProductFormData: { name: "", price: 0, image: "" } }),
    createProductIsLoading: false,
    createProductError: null,
    createProduct: e => {
        e.preventDefault()
        set({ createProductIsLoading: true })
        addProduct(get().newProductFormData)
            .then(res => {
                set(prev => ({ products: [res.data.data, ...prev.products] }))
                get().resetNewProductForm()
                modalElement.close()
                toast.success("Product added successfully")
            })
            .catch((error: AxiosError<CreateProductError>) => {
                console.log(error.response?.data.message)
                set({ createProductError: error.response?.data.message })
                toast(get().createProductError)
            })
            .then(() => set({ createProductIsLoading: false }))
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