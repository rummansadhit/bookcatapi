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
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({ data: userData });
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany();
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({ where: { id: id } });
});
exports.getSingleUser = getSingleUser;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({ where: { id: id }, data: userData });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({ where: { id: id } });
});
exports.deleteUser = deleteUser;
