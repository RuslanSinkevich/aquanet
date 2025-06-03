export interface IMaterialWorkItem {
  id: number;
  connectionPointId: number;
  description: string;
  materialId: number;
  quantity: number;
  cost: number;
  userIds: number[];
  comment?: string;
  workDate?: string;
  docLinks?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IMaterial {
  id: number;
  type: string;
  unit: string;
  unitCost: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  workItems?: IMaterialWorkItem[];
}

export interface IMaterialCreateDto {
  type: string;
  unit: string;
  unitCost: number;
  comment?: string;
}

export interface IMaterialUpdateDto extends Partial<IMaterialCreateDto> {} 