export interface IConnectionPointMinimalUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
}

export interface IConnectionPoint {
  id: number;
  name: string;
  positionM: number;
  totalCost: number;
  comment?: string;
  users: IConnectionPointMinimalUser[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IConnectionPointCreateDto {
  name: string;
  positionM: number;
  totalCost: number;
  comment?: string;
}

export interface IConnectionPointUpdateDto {
  name?: string;
  positionM?: number;
  totalCost?: number;
  comment?: string;
} 