import { Task } from '@entities/Task'
import { database } from '@infra/database/knex'
import { TaskModel } from '@infra/database/ModelInfra/TaskModel'
import { ITaskRepository } from '@repositories/ITaskRepository'

class TaskRepository implements ITaskRepository {
  async list (): Promise<Task[]> {
    return TaskModel.query().orderBy('active', 'DESC')
  }

  async listByUser (user_id: number): Promise<Task[]> {
    return TaskModel.query().where('user_id', user_id).orderBy('active', 'DESC')
  }

  async findByPublicId (task_public_id: string): Promise<Task> {
    return TaskModel.query().where('public_id', task_public_id).first()
  }

  async edit (task_public_id: string, task: Task): Promise<Task> {
    await database.transaction(async trx => {
      return await TaskModel.query(trx).update({ ...task }).where('public_id', task_public_id).first()
    })
    return task
  }

  async save (task: Task): Promise<Task> {
    const data = await database.transaction(async trx => {
      return TaskModel.query(trx).insert({ ...task })
    })
    return data
  }

  async deleteById (task_public_id: string): Promise<void> {
    const task = await TaskModel.query().where('public_id', task_public_id).first()
    await database.transaction(async trx => {
      await TaskModel.query(trx).deleteById(task.id)
    })
  }
}

export { TaskRepository }
