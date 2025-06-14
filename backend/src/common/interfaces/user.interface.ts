export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  isConfirmed: boolean;
  banned: boolean;
  role: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
