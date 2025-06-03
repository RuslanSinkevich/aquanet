import { UserRole } from "../../common/enums/user-role.enum";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  role: UserRole;
  isConfirmed: boolean;
  banned: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}