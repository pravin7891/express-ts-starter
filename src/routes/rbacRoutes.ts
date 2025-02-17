import { Router } from 'express';
import RbacController from '../controllers/RbacController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import checkPermission from "../middlewares/CheckPermission";

const router = Router();
const rbacController = new RbacController();

router.get('/roles', AuthMiddleware.verifyToken, checkPermission("manage.rbac"),  rbacController.getRoles);
router.get('/permissions', AuthMiddleware.verifyToken, checkPermission("manage.rbac"), rbacController.getPermissions);

// router.post('/assign-roles', AuthMiddleware.verifyToken, checkPermission("manage.rbac"),  rbacController.assignRoles);
// router.post('/assign-permissions', AuthMiddleware.verifyToken, checkPermission("manage.rbac"), rbacController.assignPermissions);

export default router;