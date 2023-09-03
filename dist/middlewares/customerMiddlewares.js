"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerMiddleware = void 0;
function customerMiddleware(req, res, next) {
    // Check user role from the req object. This is a simplified example. 
    // You might want to get this information from a token, session, etc.
    if (req.user && req.user.role === 'customer') {
        req.params.id = req.user.id;
        req.params.role = req.user.role;
        next();
    }
    else {
        res.status(403).json({ success: false, message: 'Permission denied' });
    }
}
exports.customerMiddleware = customerMiddleware;
