import { IUser } from "./user.model";

export interface ILoginRequest {
  phone: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterRequest extends Omit<IUser, "id" | "createdAt"> {
  password: string;
}
  