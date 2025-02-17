import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { upload } from '../config/fileUpload';
import checkPermission from "../middlewares/CheckPermission";

const router = Router();
const userController = new UserController();

// router.get('/', AuthMiddleware.verifyToken, userController.getAllUsers);

// router.put('/profile', AuthMiddleware.verifyToken, upload.single('profilePicture'), userController.updateProfile);
router.get('/profile', AuthMiddleware.verifyToken, userController.getMyProfile);
router.get('/(:userId)/profile', AuthMiddleware.verifyToken, checkPermission("user.profile"),  userController.getUserProfile);

router.put('/profile', AuthMiddleware.verifyToken, upload.single('profilePicture'), userController.updateProfile);
router.put('/update-password', AuthMiddleware.verifyToken, userController.updatePassword);
router.put('/update-profile-picture', AuthMiddleware.verifyToken, upload.single('profilePicture'), userController.updateProfilePicture);
export default router;