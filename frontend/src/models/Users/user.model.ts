export enum UserRole {
  ADMIN = 0,
  PRORAB = 1,
  USER = 2
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  role: UserRole;
  isConfirmed: boolean;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// DTO для обновления пользователя
export interface IUserUpdateDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  houseNumber?: string;
  isConfirmed?: boolean;
  banned?: boolean;
}

export interface IUserCreateDto {
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  password: string;
}