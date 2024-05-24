export interface Task {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
