import Post from '../database/models/Post';

export default class PostRepository {
    async createPost(title: string, content: string, userId: number) {
        return await Post.create({ title, content, userId });
    }

    async getAllPosts() {
        return await Post.findAll();
    }

    async getPostById(id: number) {
        return await Post.findByPk(id);
    }

    async updatePost(id: number, title: string, content: string) {
        return await Post.update({ title, content }, { where: { id } });
    }

    async deletePost(id: number) {
        return await Post.destroy({ where: { id } });
    }
}