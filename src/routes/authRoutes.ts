import { NextFunction, Router } from 'express';
import AuthController from "../controllers/AuthController";
import validate from "../middlewares/ValidateMiddleware";
import { userLoginSchema, userRegisterSchema } from "../schemas/authSchema";
const router = Router();
const authController = new AuthController();
import upload from "../middlewares/UploadMiddleware";
  
router.post('/register', upload.single("file"), (req, res, next) => {
    const body = { ...req.body, file: req.file ? { buffer: req.file.buffer, mimetype: req.file.mimetype } : undefined };
    next()
    // const result = userSchema.safeParse(body);
    // if (!result.success) {
    //   return res.status(400).json({ errors: formatZodErrors(result.error) });
    // }
}, validate(userRegisterSchema), authController.register);
router.post('/login', validate(userLoginSchema), authController.login);
router.get("/verify-email", authController.verifyEmailHandler);
export default router;