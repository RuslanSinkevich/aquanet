export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
} 