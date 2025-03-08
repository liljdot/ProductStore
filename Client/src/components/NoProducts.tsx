import { PackageIcon } from "lucide-react";

const NoProducts: React.FC = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
                <div className="bg-base-100 rounded-full p-6">
                    <PackageIcon className="size-12" />
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold">No products found</h3>
                    <p className="text-gray-500 max-w-sm">Get started by adding your first product to the inventory</p>
                </div>
            </div>
        </>
    )
}

export default NoProducts;