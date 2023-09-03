"use strict";
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
exports.fetchBooksByCategory = exports.fetchBooks = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = exports.SortOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicationDate } = bookData;
    const publicationDateObj = new Date(publicationDate);
    // Use spread operator to copy all properties, then override the publicationDate
    const bookObj = Object.assign(Object.assign({}, bookData), { publicationDate: publicationDateObj });
    return yield prisma.book.create({
        data: bookObj,
        include: {
            category: true,
        },
    });
});
exports.createBook = createBook;
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.book.findMany({
        include: {
            category: true,
        },
    });
});
exports.getAllBooks = getAllBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.book.findUnique({
        where: { id: id },
        include: {
            category: true,
        },
    });
});
exports.getBookById = getBookById;
const updateBook = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.book.update({
        where: { id: id },
        data: bookData,
        include: {
            category: true,
        },
    });
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.book.delete({
        where: { id: id },
    });
});
exports.deleteBook = deleteBook;
const fetchBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const page = filters.page || 1;
    const size = filters.size || 10;
    const searchFilters = {};
    if (filters.minPrice || filters.maxPrice) {
        searchFilters.price = Object.assign(Object.assign({}, (filters.minPrice ? { gte: filters.minPrice } : {})), (filters.maxPrice ? { lte: filters.maxPrice } : {}));
    }
    if (filters.category) {
        searchFilters.categoryId = filters.category;
    }
    if (filters.search) {
        searchFilters.OR = [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { author: { contains: filters.search, mode: 'insensitive' } },
            { genre: { contains: filters.search, mode: 'insensitive' } }
        ];
    }
    let orderBy = {};
    if (filters.sortBy) {
        orderBy[filters.sortBy] = filters.sortOrder || SortOrder.ASC;
    }
    else {
        orderBy = { title: SortOrder.ASC }; // Default sorting
    }
    try {
        const findManyArgs = {
            where: (Object.keys(searchFilters).length > 0) ? searchFilters : undefined,
            skip: (page - 1) * size,
            take: size
        };
        if (Object.keys(orderBy).length > 0) {
            findManyArgs.orderBy = orderBy;
        }
        const books = yield prisma.book.findMany(findManyArgs);
        const totalBooks = yield prisma.book.count({ where: searchFilters });
        const totalPages = Math.ceil(totalBooks / size);
        return {
            success: true,
            statusCode: 200,
            message: "Books fetched successfully",
            meta: {
                page,
                size,
                total: totalBooks,
                totalPage: totalPages
            },
            data: books
        };
    }
    catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
});
exports.fetchBooks = fetchBooks;
// services/bookService.ts
const fetchBooksByCategory = (categoryId, page = 1, size = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchFilters = { categoryId };
        const books = yield prisma.book.findMany({
            where: searchFilters,
            skip: (page - 1) * size,
            take: size
        });
        const totalBooks = yield prisma.book.count({ where: searchFilters });
        const totalPages = Math.ceil(totalBooks / size);
        return {
            success: true,
            statusCode: 200,
            message: "Books with associated category data fetched successfully",
            meta: {
                page,
                size,
                total: totalBooks,
                totalPage: totalPages
            },
            data: books
        };
    }
    catch (error) {
        console.error("Error fetching books by category:", error);
        throw error;
    }
});
exports.fetchBooksByCategory = fetchBooksByCategory;
