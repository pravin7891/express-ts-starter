import { z } from "zod";
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const userRegisterSchema = z.object({
  name: z.string({ required_error: "Name field is required"}).min(3, "Name must be at least 3 characters").max(30),
  email: z.string({ required_error: "Email field is required"}).email("Invalid email format"),
  timezone: z.string().optional(),
  password: z.string({ required_error: "Password field is required"}).min(8, "Password must be at least 8 characters"),
//   profilePicture: z.string().optional(),
  file: z
    .object({
      buffer: z.instanceof(Buffer),
      mimetype: z
        .string()
        .refine((mimetype) => allowedMimeTypes.includes(mimetype), {
          message: "Only JPEG, PNG, GIF, and WEBP images are allowed",
        }),
    })
    .optional(),
});


export const userLoginSchema = z.object({
    email: z.string({ required_error: "Email is required"}).email("Invalid email format"),
    password: z.string({ required_error: "Password is required"}).min(8, "Password must be at least 8 characters").optional(),
    otp: z.string({ required_error: "Password is required"}).length(6, "OTP must be exactly 6 digits").optional(),

  }).refine((data) => data.password || data.otp, {
    message: "Either password or OTP is required",
    path: ["password", "otp"],
  });

export const sendOtpSchema = z.object({
  email: z.string({ required_error: "Email is required"}).email("Invalid email format"),
});