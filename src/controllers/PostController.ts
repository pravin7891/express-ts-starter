import { NextFunction, Request, Response } from 'express';
import PostService from '../services/PostService';
import { AuthenticatedRequest } from "types";
import { HttpError } from "../utils/HttpError";

const postService = new PostService();

export default class PostController {
    async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if(!req.user) {throw new HttpError(400, "bad request");}
            const { title, content } = req.body;
            const userId = req.user!.id; // Assuming user ID is attached by auth middleware
            const post = await postService.createPost(title, content, userId);
            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    async getPostById(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postService.getPostById(parseInt(req.params.id));
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content } = req.body;
            await postService.updatePost(parseInt(req.params.id), title, content);
            res.json({ message: 'Post updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            await postService.deletePost(parseInt(req.params.id));
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}