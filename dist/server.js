"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./config/socket"));
const server = http_1.default.createServer(app_1.default);
const io = (0, socket_1.default)(server);
exports.io = io;
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
