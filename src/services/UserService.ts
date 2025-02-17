import UserRepository from '../repositories/UserRepository';
import UploadService from "./UploadService";
import bcrypt from 'bcrypt';

class UserService {

    async updateProfile(userId: number, name: string, email: string, file?: Express.Multer.File) {
        let profilePictureUrl = '';
        if (file) {            
            const result = await UploadService.uploadFile(file.buffer, file.filename)
            profilePictureUrl = result;            
        }
        return await UserRepository.updateUser(userId, {name, email, profilePicture:profilePictureUrl});
    }
    async updatePassword(userId: number, currentPassword: string, newPassword: string) {
        const user = await UserRepository.findById(userId);
        if (!user) throw new Error('User not found');
    
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) throw new Error('Current password is incorrect');
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return UserRepository.update(userId, { password: hashedPassword });
      }

    async updateProfilePicture(userId: number, file: Express.Multer.File) {

        // Upload file using UploadService
        const imageUrl = await UploadService.uploadFile(file.buffer, file.filename);
    
        // Update user profile picture
        return UserRepository.update(userId, { profilePicture: imageUrl });
      }
    async getProfile(userId: number): Promise<any> {
        return await UserRepository.findById(userId);
    }
}

export default new UserService();