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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authService = new AuthService_1.default();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield authService.register(name, email, password);
                res.status(201).json(user);
            }
            catch (error) {
                let errorMessage;
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                else {
                    errorMessage = error;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const { user, token } = yield authService.login(username, password);
                res.json({ user, token });
            }
            catch (error) {
                let errorMessage;
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                else {
                    errorMessage = error;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
}
exports.default = AuthController;
