import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import { useProductsStore } from "../store/useProductsStore";
import ProductsList from "../components/ProductsList";
import { useEffect } from "react";

const Home: React.FC = () => {
    const { fetchProducts, products, isError, error, isLoading } = useProductsStore()
    
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <main className="mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <button className="btn btn-primary">
                        <PlusCircleIcon className="size-5 mr-2" />
                        Add Product
                    </button>

                    <button onClick={fetchProducts} className="btn btn-ghost btn-circle">
                        <RefreshCcwIcon className="size-5" />
                    </button>
                </div>

                {isError && <div className="alert alert-error mb-8">{error}</div>}

                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loading loading-spinner loading-lg"></div>
                        </div>
                    ) : !products.length ? (
                        <div className="flex flex-col justify-center items-center h-96 space-y-4">
                            <div className="bg-base-100 rounded-full p-6">
                                <PackageIcon className="size-12"/>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-semibold">No products found</h3>
                                <p className="text-gray-500 max-w-sm">Get started by adding your first product to the inventory</p>
                            </div>
                        </div>
                    ) : (
                        <ProductsList products={products}/>
                    )
            }
            </main>
        </>
    )
}

export default Home;