import { UserRole } from "../../common/enums/user-role.enum";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  houseNumber: string;
  createdAt: string;
  role: UserRole;
}