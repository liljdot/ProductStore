import { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[]
}

const ProductsList: React.FC<Props> = ({ products }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        </>
    )
}

export default ProductsList