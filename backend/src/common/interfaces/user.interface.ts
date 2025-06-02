export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  isConfirmed: boolean;
  banned: boolean;
  password?: string;
}
