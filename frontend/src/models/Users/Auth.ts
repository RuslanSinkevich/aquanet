import { IUser } from "./user.model";
import { UserRole } from "../../common/enums/user-role.enum";

export interface IAuthLoginRequest {
  phone: string;
  password: string;
}

export interface IAuthLoginResponse {
  token: string;
  user: IUser;
}

export interface IAuthRegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  password: string;
  role?: UserRole;
}
  