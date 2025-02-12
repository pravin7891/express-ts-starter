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
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const fileUpload_1 = require("../config/fileUpload");
const streamifier_1 = __importDefault(require("streamifier"));
const userRepository = new UserRepository_1.default();
class UserService {
    constructor() {
        this.uploadToCloudinary = (buffer) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const uploadStream = fileUpload_1.cloudinary.v2.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result === null || result === void 0 ? void 0 : result.secure_url); // Ensure it's a string
                });
                streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
            });
        });
    }
    updateProfile(userId, name, email, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let profilePictureUrl = '';
            if (file) {
                if (fileUpload_1.storageOption === 'cloud') {
                    const result = yield this.uploadToCloudinary(file.buffer);
                    // const result = await cloudinary.v2.uploader.upload_stream({ folder: 'profile_pictures' }, (error: any, result: any) => {
                    //     if (error) throw new Error('Cloud upload failed');
                    //     return result?.secure_url;
                    // }).end(file.buffer);
                    profilePictureUrl = result;
                }
                else {
                    profilePictureUrl = `/uploads/${file.filename}`;
                }
            }
            return yield userRepository.updateUser(userId, { name, email, profilePicture: profilePictureUrl });
        });
    }
}
exports.default = UserService;
