import { Request, Response, NextFunction } from 'express';


export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    // Check user role from the req object. This is a simplified example. 
    // You might want to get this information from a token, session, etc.
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Permission denied' });
    }
}
