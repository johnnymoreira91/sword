import { Task } from '@entities/Task'

export interface ITaskRepository {
  list(): Promise<Task[]>;
  listByUser(user_id: string): Promise<Task[]>;
  findByPublicId(task_public_id: string): Promise<Task>;
  edit(task_public_id: string, task: Task): Promise<Task>;
  save(task: Task): Promise<Task>;
}
