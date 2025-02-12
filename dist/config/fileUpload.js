"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageOption = exports.cloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.cloudinary = cloudinary_1.default;
dotenv_1.default.config();
const storageOption = process.env.STORAGE_OPTION || 'local';
exports.storageOption = storageOption;
// Local Storage Setup
const localStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Cloudinary Storage Setup
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = (0, multer_1.default)({
    storage: storageOption === 'cloud' ? multer_1.default.memoryStorage() : localStorage,
});
exports.upload = upload;
