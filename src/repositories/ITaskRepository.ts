import { Task } from '@entities/Task'

export interface ITaskRepository {
  list(): Promise<Task[]>;
  listByUser(user_id: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
}
