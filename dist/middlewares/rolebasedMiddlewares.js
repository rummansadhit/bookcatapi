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
exports.roleBasedMiddleware = void 0;
const adminMiddlewares_1 = require("./adminMiddlewares");
const customerMiddlewares_1 = require("./customerMiddlewares");
const roleBasedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Assuming req.user is set in verifyToken middleware
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    if (user.role === 'admin') {
        req.params.id = user.id;
        req.params.role = user.role;
        return (0, adminMiddlewares_1.adminMiddleware)(req, res, next);
    }
    if (user.role === 'customer') {
        req.params.id = user.id;
        req.params.role = user.role;
        return (0, customerMiddlewares_1.customerMiddleware)(req, res, next);
    }
    // If the role is not recognized
    return res.status(403).json({
        success: false,
        message: 'Forbidden access',
    });
});
exports.roleBasedMiddleware = roleBasedMiddleware;
