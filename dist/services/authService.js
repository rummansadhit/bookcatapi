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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.verifyCredentials = exports.hashPassword = exports.generateToken = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const prisma = new client_1.PrismaClient();
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, JWT_SECRET, {
        expiresIn: '365d'
    });
}
exports.generateToken = generateToken;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        return bcrypt_1.default.hash(password, saltRounds);
    });
}
exports.hashPassword = hashPassword;
function verifyCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({ where: { email: email } });
        if (!user)
            return false;
        if (yield bcrypt_1.default.compare(password, user.password)) {
            return user;
        }
    });
}
exports.verifyCredentials = verifyCredentials;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({ data: userData });
});
exports.createUser = createUser;
