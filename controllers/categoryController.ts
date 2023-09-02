import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Categories fetched successfully',
            data: categories
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.getSingleCategory(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category fetched successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category updated successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category deleted successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
