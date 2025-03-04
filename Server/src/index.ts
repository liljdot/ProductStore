//imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes";

dotenv.config()

const app = express()
const PORT = process.env.PORT

//middleware
app.use(helmet()); // helmet is a security middleware for app protection by setting various HTTP headers
app.use(morgan("dev")); // automatically log requests to the console
app.use(express.json()); // send and receive json data
app.use(cors()); // handle cors errors
//route specific middleware
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
    res.send("Hello from the server")
})

app.get("/test", (req, res) => {
    res.send("Hello from the test route")
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})