export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isConfirmed: boolean;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
} 