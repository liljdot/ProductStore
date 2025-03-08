import AddProductForm from "./AddProduct Form"


const AddProductModal: React.FC = () => {

    return (
        <>
            <dialog id="add_product_modal" className="modal">
                <div className="modal-box">
                    {/* CLOSE  */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* HEADER  */}
                    <h3 className="font-bold text-xl mb-8">Add New Product</h3>

                    {/* FORM  */}
                    <AddProductForm />
                </div>
                <form className="modal-backdrop" method="dialog">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default AddProductModal