"use strict";
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
exports.getUserProfile = void 0;
const profileService_1 = require("../services/profileService");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || '';
    const user = yield (0, profileService_1.getUserFromDatabase)(id); // Implement the database logic.
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Profile retrieved successfully',
        data: user
    });
});
exports.getUserProfile = getUserProfile;
