"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
const postController = new PostController_1.default();
router.post('/', AuthMiddleware_1.default.verifyToken, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', AuthMiddleware_1.default.verifyToken, postController.updatePost);
router.delete('/:id', AuthMiddleware_1.default.verifyToken, postController.deletePost);
exports.default = router;
