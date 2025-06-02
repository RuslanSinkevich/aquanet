export interface IWorkItem {
  id: number;
  name: string;
  description?: string;
  cost: number;
  status: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateWorkItemDto {
  name: string;
  description?: string;
  cost: number;
  connectionPointId: number;
}

export interface IUpdateWorkItemDto {
  name?: string;
  description?: string;
  cost?: number;
  connectionPointId?: number;
} 