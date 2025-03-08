import { useProductsStore } from "../store/useProductsStore";
import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react"

const AddProductForm: React.FC = () => {
    const { createProduct, newProductFormData, setNewProductFormData, createProductIsLoading, isLoading } = useProductsStore()

    return (
        <>
            <form onSubmit={createProduct} className="space-y-6">
                <div className="grid gap-6">
                    {/* PRODUCT NAME INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Product Name</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Package2Icon className="size-5" />
                            </div>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter product name"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={newProductFormData.name}
                                onChange={setNewProductFormData}
                            />
                        </div>
                    </div>

                    {/* PRODUCT PRICE INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Price</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <DollarSignIcon className="size-5" />
                            </div>
                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={newProductFormData.price}
                                onChange={setNewProductFormData}
                            />
                        </div>
                    </div>

                    {/* PRODUCT IMAGE */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Image URL</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <ImageIcon className="size-5" />
                            </div>
                            <input
                                name="image"
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={newProductFormData.image}
                                onChange={setNewProductFormData}
                            />
                        </div>
                    </div>
                </div>

                {/* MODAL ACTIONS */}
                <div className="modal-action">
                    {/* <form method="dialog">
                                <button className="btn btn-ghost">Cancel</button>
                            </form> */}
                    <button
                        type="submit"
                        className="btn btn-primary min-w-[120px]"
                        disabled={!newProductFormData.name || !newProductFormData.price || !newProductFormData.image || createProductIsLoading}
                    >
                        {createProductIsLoading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <>
                                <PlusCircleIcon className="size-5 mr-2" />
                                Add Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddProductForm;