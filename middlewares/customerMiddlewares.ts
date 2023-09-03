import { Request, Response, NextFunction } from 'express';


export function customerMiddleware(req: Request, res: Response, next: NextFunction) {
    // Check user role from the req object. This is a simplified example. 
    // You might want to get this information from a token, session, etc.
    if (req.user && req.user.role === 'customer') {
        req.params.id = req.user.id;
        req.params.role = req.user.role;
        next();

    } else {
        res.status(403).json({ success: false, message: 'Permission denied' });
    }
}