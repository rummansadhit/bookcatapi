"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController = __importStar(require("../controllers/bookController"));
const verifytokenMiddlewares_1 = require("../middlewares/verifytokenMiddlewares");
const adminMiddlewares_1 = require("../middlewares/adminMiddlewares");
const bookRoutes = express_1.default.Router();
bookRoutes.post('/create-book', verifytokenMiddlewares_1.verifyToken, adminMiddlewares_1.adminMiddleware, bookController.createBook);
bookRoutes.get('/:categoryId/category', bookController.getBooksByCategoryId);
bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:id', bookController.getBookById);
bookRoutes.patch('/:id', verifytokenMiddlewares_1.verifyToken, adminMiddlewares_1.adminMiddleware, bookController.updateBook);
bookRoutes.delete('/:id', verifytokenMiddlewares_1.verifyToken, adminMiddlewares_1.adminMiddleware, bookController.deleteBook);
exports.default = bookRoutes;
