import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import UpdateProductForm from "../components/UpdateProductForm";

const ProductPage: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { fetchSingleProduct, isLoading, error, isError, currentProduct } = useProductsStore()

    useEffect(() => {
        fetchSingleProduct(Number(id))
    }, [])

    if (isLoading) {
        return (
            <>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </>
        )
    }

    if (isError) {
        return (
            <>
                <div className="container mx-auto px-4 py-8">
                    <div className="alert alert-error">{error}</div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
                    <ArrowLeftIcon />
                    Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* IMAGE  */}
                    <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
                        <img
                            src={currentProduct?.image}
                            alt={currentProduct?.name}
                            className="size-full object-cover"
                        />
                    </div>

                    {/* FORM  */}
                    <UpdateProductForm />
                </div>
            </div>
        </>
    )
}

export default ProductPage;