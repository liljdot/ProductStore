"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
//middleware
app.use((0, helmet_1.default)()); // helmet is a security middleware for app protection by setting various HTTP headers
app.use((0, morgan_1.default)("dev")); // automatically log requests to the console
app.use(express_1.default.json()); // send and receive json data
app.use((0, cors_1.default)()); // handle cors errors
app.get("/", (req, res) => {
    res.send("Hello from the server");
});
app.get("/test", (req, res) => {
    res.send("Hello from the test route");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
