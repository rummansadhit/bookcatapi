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
exports.signIn = exports.signUp = void 0;
const authService_1 = require("../services/authService");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = req.body;
        const hashedPassword = yield (0, authService_1.hashPassword)(userData.password);
        // Store user into the database with hashed password.
        const newUser = Object.assign(Object.assign({}, userData), { password: hashedPassword });
        try {
            const user = yield (0, authService_1.createUser)(newUser);
            res.json({ success: true, messege: 'User created successfully!', data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Error" });
        }
    });
}
exports.signUp = signUp;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Check user's credentials.
            const user = yield (0, authService_1.verifyCredentials)(email, password);
            console.log(user);
            if (!user) {
                res.status(400).json({ success: false, message: "Invalid email or password." });
                return;
            }
            // Generate JWT Token
            const token = (0, authService_1.generateToken)(user);
            res.json({ success: true, token });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Error" });
        }
    });
}
exports.signIn = signIn;
