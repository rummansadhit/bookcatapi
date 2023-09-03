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
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.create({ data: categoryData });
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.findMany();
});
exports.getAllCategories = getAllCategories;
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.findUnique({ where: { id: id }, include: { books: true } });
});
exports.getSingleCategory = getSingleCategory;
const updateCategory = (id, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.update({ where: { id: id }, data: categoryData });
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.delete({ where: { id: id } });
});
exports.deleteCategory = deleteCategory;
