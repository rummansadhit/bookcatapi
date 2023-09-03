"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
function adminMiddleware(req, res, next) {
    // Check user role from the req object. This is a simplified example. 
    // You might want to get this information from a token, session, etc.
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ success: false, message: 'Permission denied' });
    }
}
exports.adminMiddleware = adminMiddleware;
