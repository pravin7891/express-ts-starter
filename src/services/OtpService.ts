import speakeasy from "speakeasy";
import Redis from "ioredis";
import EmailService from "./EmailService";

const redis = new Redis(); // Redis instance

class OtpService {
  // Generate and store OTP
  async generateOtp(email: string, name: string): Promise<void> {
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET || "my-secret",
      digits: 6,
      step: 300, // Valid for 5 minutes
    });

    // Store OTP in Redis (expires in 5 minutes)
    await redis.set(`otp:${email}`, otp, "EX", 300);

    // Send OTP via Email
    await EmailService.sendEmail(email, "Your OTP Code", 'loginOtp', { name, otp });
  }

  // Verify OTP
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) return false;

    // Remove OTP from Redis after successful verification
    await redis.del(`otp:${email}`);
    return true;
  }
}

export default new OtpService();
