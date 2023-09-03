import { Request, Response } from 'express';
import * as userService from '../services/userServices';


export const signUp = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.json({ 
            success: true,
            statusCode: 200,
            message: 'User created successfully!',
            data: user
         });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
          });
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
          });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getSingleUser(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
          });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Server error',
          });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User deleted successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json( {
            success: false,
            statusCode: 500,
            message: 'Server error',
          } );
    }
};


