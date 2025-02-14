import { Request } from "express";

export interface AuthUser {
    id: number;
    email: string;
    username: string;
    role: "user" | "admin"; // Extend as needed
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest extends LoginRequest {
    username: string;
  }
  
  export interface AuthResponse {
    user: AuthUser;
    token: string;
  }
  
  export interface JwtPayload {
    id: number;
    email: string;
    loginHistoryId: number;
    role: string;
    iat?: number;
    exp?: number;
  }
  export interface AuthenticatedUser {
    id: number;
    loginHistoryId: number;
    email: string;
    role: string;
  }
  export interface AuthenticatedRequest extends Request {
    user?: AuthUser;
    file?: any;
  }  
  export interface AuthUser {
    id: number;
    email: string;
    loginHistoryId: number;
    roles: Array<string[]>;
  }