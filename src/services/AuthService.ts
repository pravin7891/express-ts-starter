import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateVerificationToken } from "../utils/Helpers";
import EmailService from "./EmailService";
import UploadService from "./UploadService";
import useragent from "useragent";
import LoginHistoryRepository from "../repositories/LoginHistoryRepository";

export default class AuthService {
    async register(userData: any, file?: Express.Multer.File) {
        const { name, email, password } = userData;
          // Check if user already exists
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use" );
        }
        let profilePictureUrl = "";
        if(file){            
            profilePictureUrl = await UploadService.uploadFile(file.buffer, file.originalname); // third param is folder name. defaults to uploads
        }
        // Generate verification token
        const verificationToken = generateVerificationToken();
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;
        const newUser = await UserRepository.createUser({
            ...userData,
            profilePicture: profilePictureUrl
        });
        console.log("newUser: ", newUser)
        // Send verification email
        await EmailService.sendEmail(email, "Verify your email", "verificationEmail", {verificationLink});
    }

    verifyEmail = async (token: string) => {
        const user = await UserRepository.findOne({ where: { verificationToken: token } });
        if (!user) throw new Error("Invalid or expired token");
      
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
      
        return { message: "Email successfully verified!" };
      };
    async login(email: string, password: string, userAgentString: string, ipAddress: string) {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        //Check user email is verified
        if (!user.isVerified) throw new Error("Please verify your email before logging in");

        //check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const userAgent = useragent.parse(userAgentString);
    const loginHistory = await LoginHistoryRepository.create({
      userId: user.id,
      deviceName: userAgent.device.toString() || "Unknown",
      deviceOS: userAgent.os.toString() || "Unknown",
      ipAddress: ipAddress || "Unknown",
      browserName: userAgent.family || "Unknown",
      isActive: true,
    });
        //create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, loginHistoryId: loginHistory.id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        return { user, token };
    }

    async logout(token: string) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { loginHistoryId: number };
          await LoginHistoryRepository.deactivateSession(decoded.loginHistoryId);
          return { message: "Logged out successfully" };
        } catch {
          throw new Error("Invalid token");
        }
      }
}