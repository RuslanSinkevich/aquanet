export interface IWorkItem {
  id: number;
  cost: number;
  userIds: number[];
  description: string;
  comment?: string;
  workDate?: string;
  docLinks?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IWorkItemCreateDto {
  cost: number;
  userIds: number[];
  description: string;
  comment?: string;
  workDate?: string;
  docLinks?: string[];
}

export interface IWorkItemUpdateDto {
  cost?: number;
  userIds?: number[];
  description?: string;
  comment?: string;
  workDate?: string;
  docLinks?: string[];
} 