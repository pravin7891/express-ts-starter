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
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
const server_1 = require("../server");
const postRepository = new PostRepository_1.default();
class PostService {
    createPost(title, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postRepository.createPost(title, content, userId);
            // Emit WebSocket event to notify clients of a new post
            server_1.io.emit('newPost', post);
            return post;
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository.getAllPosts();
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository.getPostById(id);
        });
    }
    updatePost(id, title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository.updatePost(id, title, content);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository.deletePost(id);
        });
    }
}
exports.default = PostService;
