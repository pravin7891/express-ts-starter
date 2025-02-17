import postRepository from '../repositories/PostRepository';
import { io } from '../server';
export default class PostService {
    async createPost(title: string, content: string, userId: number) {
        const post = await postRepository.createPost(title, content, userId);
        
        // Emit WebSocket event to notify clients of a new post
        io.emit('newPost', post);

        return post;
    }

    async getAllPosts() {
        return await postRepository.getAllPosts();
    }

    async getPostById(id: number) {
        return await postRepository.getPostById(id);
    }

    async updatePost(id: number, title: string, content: string) {
        return await postRepository.updatePost(id, title, content);
    }

    async deletePost(id: number) {
        return await postRepository.deletePost(id);
    }
}