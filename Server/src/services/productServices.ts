import { QueryResult } from "pg"
import query from "../db.js"
import { Product } from "../types"

const initProducts: () => Promise<void> = () => {
    return query(`CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)
        .then(res => {
            console.log(res)
            query(`CREATE OR REPLACE FUNCTION update_timestamp()
                    RETURNS TRIGGER AS $$
                    BEGIN
                    NEW.updated_at = CURRENT_TIMESTAMP;
                    RETURN NEW;
                    END;
                    $$ LANGUAGE plpgsql;

                    DROP TRIGGER IF EXISTS update_timestamp_trigger ON products;
                    CREATE TRIGGER update_timestamp_trigger
                    BEFORE UPDATE ON products
                    FOR EACH ROW
                    EXECUTE FUNCTION update_timestamp();
`)
        })
        .then(() => {
            console.log("Products init success")
        })
        .catch(e => console.log(e))
}

const getAllProducts: () => Promise<Product[]> = () => {
    return query<Product>(`SELECT * FROM products
        ORDER BY created_at DESC`)
        .then(res => res.rows)
}

const getProduct: (id: number) => Promise<Product> = id => {
    return query<Product>(`SELECT * FROM products
        WHERE id = ${id}`)
        .then(res => res.rows[0])
}

const createProduct: (name: string, image: string, price: number) => Promise<Product> = (name, image, price) => {
    return query<Product>(`INSERT INTO products (name, image, price) 
        VALUES ('${name}', '${image}', ${price})
        RETURNING *`)
        .then(res => res.rows[0])
}

const updateProduct: (id: number, name: string, image: string, price: number) => Promise<Product> = (id, name, image, price) => {
    return query<Product>(`UPDATE products
        SET name = '${name}',
        image = '${image}',
        price = ${price}
        WHERE id = ${id}
        RETURNING *`)
        .then(res => res.rows[0])
}

const deleteProduct: (id: number) => Promise<void> = id => {
    return query(`DELETE FROM products WHERE id = ${id}`)
    .then(() => void 0)
}

export default { initProducts, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }