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
const UserService_1 = __importDefault(require("../services/UserService"));
const HttpError_1 = require("../utils/HttpError");
const userService = new UserService_1.default();
class UserController {
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    throw new HttpError_1.HttpError(400, "Badre");
                }
                const { name, email } = req.body;
                const userId = req === null || req === void 0 ? void 0 : req.user.id; // Extracted from JWT middleware
                const file = req.file;
                const user = yield userService.updateProfile(userId, name, email, file);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
