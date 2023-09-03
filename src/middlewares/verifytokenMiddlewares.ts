import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
declare global {
    namespace Express {
      interface Request {
        user?: {
            id: string;
          role: string;
        };
      }
    }
  }
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded:any = jwt.verify(token, `${process.env.JWT_SECRET}`); // Assuming you have JWT_SECRET in your .env file

        // Attach the decoded token to the request object
        console.log(decoded);
        req.user = decoded
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
