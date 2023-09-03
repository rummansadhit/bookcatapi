"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByCategoryId = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const bookService = __importStar(require("../services/bookService"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Check if the user is an admin
    const book = yield bookService.createBook(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Book created successfully",
        data: book,
    });
});
exports.createBook = createBook;
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, size, sortBy, sortOrder, minPrice, maxPrice, category, search } = req.query;
            console.log(req.query);
            let bookOrder;
            if (sortOrder === 'asc') {
                bookOrder = bookService.SortOrder.ASC;
            }
            else if (sortOrder === 'desc') {
                bookOrder = bookService.SortOrder.DESC;
            }
            else {
                bookOrder = bookService.SortOrder.ASC;
            }
            const booksData = yield bookService.fetchBooks({
                page: page === undefined ? undefined : Number(page),
                size: size === undefined ? undefined : Number(size),
                sortBy: sortBy === undefined ? undefined : String(sortBy),
                sortOrder: bookOrder,
                minPrice: maxPrice === undefined ? undefined : Number(minPrice),
                maxPrice: maxPrice === undefined ? undefined : Number(maxPrice),
                category: category === undefined ? undefined : String(category),
                search: search === undefined ? undefined : String(search)
            });
            res.json(booksData);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Error"
            });
        }
    });
}
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookService.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Book not found',
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Book fetched successfully',
            data: book
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield bookService.updateBook(req.params.id, req.body);
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Book not found or update failed',
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookService.deleteBook(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Book not found or deletion failed',
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Book deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
        });
    }
});
exports.deleteBook = deleteBook;
// controllers/bookController.ts
const bookService_1 = require("../services/bookService");
const getBooksByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const { page = 1, size = 10 } = req.query;
        const response = yield (0, bookService_1.fetchBooksByCategory)(categoryId, Number(page), Number(size));
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error fetching books by category:", error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
exports.getBooksByCategoryId = getBooksByCategoryId;
