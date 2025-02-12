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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = __importDefault(require("../services/PostService"));
const HttpError_1 = require("../utils/HttpError");
const postService = new PostService_1.default();
class PostController {
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new HttpError_1.HttpError(400, "bad request");
                }
                const { title, content } = req.body;
                const userId = req.user.id; // Assuming user ID is attached by auth middleware
                const post = yield postService.createPost(title, content, userId);
                res.status(201).json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService.getAllPosts();
                res.json(posts);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postService.getPostById(parseInt(req.params.id));
                if (!post)
                    return res.status(404).json({ error: 'Post not found' });
                res.json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                yield postService.updatePost(parseInt(req.params.id), title, content);
                res.json({ message: 'Post updated successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield postService.deletePost(parseInt(req.params.id));
                res.json({ message: 'Post deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = PostController;
