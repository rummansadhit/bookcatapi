"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/books', bookRoutes_1.default);
app.use('/api/v1/categories', categoryRoutes_1.default);
app.use('/api/v1/orders', orderRoutes_1.default);
app.use('/api/v1/profile', profileRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
