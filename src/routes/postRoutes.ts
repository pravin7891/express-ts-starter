import { Router } from 'express';
import PostController from '../controllers/PostController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();
const postController = new PostController();

router.post('/', AuthMiddleware.verifyToken, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', AuthMiddleware.verifyToken, postController.updatePost);
router.delete('/:id', AuthMiddleware.verifyToken, postController.deletePost);

export default router;