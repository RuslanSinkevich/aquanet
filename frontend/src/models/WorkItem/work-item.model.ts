export interface IWorkItem {
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

export interface IWorkItemCreateDto {
  connectionPointId: number;
  description: string;
  materialId: number;
  quantity: number;
  userIds: number[];
  comment?: string;
  workDate?: string;
  docLinks?: string[];
}

export interface IWorkItemUpdateDto {
  connectionPointId?: number;
  description?: string;
  materialId?: number;
  quantity?: number;
  userIds?: number[];
  comment?: string;
  workDate?: string;
  docLinks?: string[];
} 