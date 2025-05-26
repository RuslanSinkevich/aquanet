export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  createdAt: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
