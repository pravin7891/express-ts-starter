"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const fileUpload_1 = require("../config/fileUpload");
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
// router.get('/', AuthMiddleware.verifyToken, userController.getAllUsers);
// router.put('/profile', AuthMiddleware.verifyToken, upload.single('profilePicture'), userController.updateProfile);
router.put('/profile', AuthMiddleware_1.default.verifyToken, fileUpload_1.upload.single('profilePicture'), userController.updateProfile);
exports.default = router;
