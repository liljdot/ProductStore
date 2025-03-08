import { Link } from "react-router-dom";
import { Product } from "../types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useProductsStore } from "../store/useProductsStore";

interface Props {
    product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { deleteProduct, deleteProductId } = useProductsStore()
    return (
        <>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* IMAGE  */}
                <figure className="relative pt-[56.25%]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </figure>

                {/* DETAILS  */}
                <div className="card-body">
                    <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                    <p className="text-2xl font-bold text-primary">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    {/* ACTIONS  */}
                    <div className="card-actions justify-end mt-4">
                        <Link to={`/${product.id}`} className="btn btn-sm btn-info btn-outline">
                            <EditIcon className="size-4" />
                        </Link>

                        <button disabled = {deleteProductId == product.id} className="btn btn-sm btn-error btn-outline" onClick={() => deleteProduct(product.id)}>
                            {deleteProductId == product.id ? <div className="loading loading-spinner loading-xs"></div> : <Trash2Icon className="size-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard