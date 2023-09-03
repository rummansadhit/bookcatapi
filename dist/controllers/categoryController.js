"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = void 0;
const categoryService = __importStar(require("../services/categoryService"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.createCategory(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category created successfully',
            data: category
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Categories fetched successfully',
            data: categories
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCategories = getAllCategories;
const getSingleCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.getSingleCategory(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category fetched successfully',
            data: category
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSingleCategory = getSingleCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category updated successfully',
            data: category
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.deleteCategory(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Category deleted successfully',
            data: category
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
