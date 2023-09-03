import { getUserFromDatabase } from "../services/profileService";
import { Request, Response } from 'express';

export const getUserProfile = async (req: Request, res:Response) => {
    const id = req.user?.id || ''
    const user = await getUserFromDatabase(id);  // Implement the database logic.

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Profile retrieved successfully',
        data: user
    });
};