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
const emailConfig_1 = __importDefault(require("../config/emailConfig"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
class EmailService {
    static sendEmail(to, subject, templateName, templateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templatePath = path_1.default.join(__dirname, `../templates/emails/${templateName}.hbs`);
                const templateSource = fs_1.default.readFileSync(templatePath, 'utf8');
                const compiledTemplate = handlebars_1.default.compile(templateSource);
                const html = compiledTemplate(templateData);
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to,
                    subject,
                    html,
                };
                yield emailConfig_1.default.sendMail(mailOptions);
                console.log(`Email sent to ${to} - Subject: ${subject}`);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
    }
}
exports.default = EmailService;
