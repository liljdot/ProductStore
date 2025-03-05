import { Client, QueryResult } from "pg"
import dotenv from "dotenv"

dotenv.config()

const { DB_URL } = process.env

const db = new Client({
    connectionString: DB_URL
})

db.connect()

db.on("error", err => console.log(err))

const query: <T extends object>(text: string, params?: any) => Promise<QueryResult<T>> = (text: string, params?: any) => {
    return db.query(text, params)
}

export default query