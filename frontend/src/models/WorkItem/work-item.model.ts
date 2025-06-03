export interface IWorkItem {
  id: number;
  name: string;
  description?: string;
  cost: number;
  status: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IWorkItemCreateDto {
  name: string;
  description?: string;
  cost: number;
  connectionPointId: number;
}

export interface IWorkItemUpdateDto {
  name?: string;
  description?: string;
  cost?: number;
  connectionPointId?: number;
} 