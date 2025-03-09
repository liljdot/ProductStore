import { SaveIcon, Trash2Icon } from "lucide-react";
import { useProductsStore } from "../store/useProductsStore";
import { EventHandler } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProductForm: React.FC = () => {
    const navigate = useNavigate()
    const { updateProduct, updateProductIsLoading, updateProductFormData, setUpdateProductFormData, deleteProduct, deleteProductId, currentProduct } = useProductsStore()

    const handleDelete: EventHandler<React.MouseEvent> = e => {
        e.preventDefault()
        if (!currentProduct?.id) {
            return toast.error("Something went wrong. Please refresh the page and try again")
        }

        deleteProduct(currentProduct.id)
        .then(() => navigate("/"))
    }

    return (
        <>
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-6">Edit Product</h2>
                    <form onSubmit={updateProduct} className="space-y-6">
                        {/* NAME  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text_base font-medium">Product Name</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={updateProductFormData.name}
                                onChange={setUpdateProductFormData}
                                className="input input-bordered w-full"></input>
                        </div>

                        {/* PRICE  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text_base font-medium">Price</span>
                            </label>

                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                min={0}
                                step={0.01}
                                value={updateProductFormData.price}
                                onChange={setUpdateProductFormData}
                                className="input input-bordered w-full"></input>
                        </div>

                        {/* IMAGE  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text_base font-medium">Image URL</span>
                            </label>

                            <input
                                type="text"
                                name="image"
                                placeholder="https://example.com/image.jpg"
                                value={updateProductFormData.image}
                                onChange={setUpdateProductFormData}
                                className="input input-bordered w-full"></input>
                        </div>

                        {/* ACTIONS  */}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                disabled={!!deleteProductId}
                                onClick={handleDelete}
                                className="btn btn-error">
                                <Trash2Icon className="size-4 mr-2" />
                                {deleteProductId ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )
                                    : "Delete Product"}
                            </button>

                            <button
                                type="submit"
                                disabled={!!deleteProductId || updateProductIsLoading || !updateProductFormData.name || !updateProductFormData.price || !updateProductFormData.image}
                                className="btn btn-primary">
                                {updateProductIsLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )
                                    : (
                                        <>
                                            <SaveIcon className="size-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProductForm;