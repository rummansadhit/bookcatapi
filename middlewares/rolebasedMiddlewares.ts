import { adminMiddleware } from "./adminMiddlewares";
import { customerMiddleware } from "./customerMiddlewares";
import { Request, Response, NextFunction } from 'express';
export const roleBasedMiddleware = async(req: Request, res: Response, next: NextFunction) => {
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
        return adminMiddleware(req, res, next);
    }

    if (user.role === 'customer') {
        req.params.id = user.id;
        req.params.role = user.role;
        return customerMiddleware(req, res, next);
    }

    // If the role is not recognized
    return res.status(403).json({
        success: false,
        message: 'Forbidden access',
    });
};