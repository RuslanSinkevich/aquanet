import { User } from "./User";

export interface LoginRequest {
    phone: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    user: User;
  }
  
  export interface RegisterRequest extends Omit<User, "id"> {
    password: string;
  }
  