"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`); // Assuming you have JWT_SECRET in your .env file
        // Attach the decoded token to the request object
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
exports.verifyToken = verifyToken;
