import { Task } from '@entities/Task'

export interface ITaskRepository {
  list(): Promise<Task[]>;
  listByUser(user_id: number): Promise<Task[]>;
  findByPublicId(task_public_id: string): Promise<Task>;
  edit(task_public_id: string, task: Task): Promise<Task>;
  save(task: Task): Promise<Task>;
  deleteById(task_public_id: string): Promise<void>;
}
