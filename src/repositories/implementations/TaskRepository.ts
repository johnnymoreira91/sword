import { Task } from '@entities/Task'
import { database } from '@infra/database/knex'
import { TaskModel } from '@infra/database/ModelInfra/TaskModel'
import { ITaskRepository } from '@repositories/ITaskRepository'

class TaskRepository implements ITaskRepository {
  async list (): Promise<Task[]> {
    return TaskModel.query()
  }

  async listByUser (user_id: string): Promise<Task[]> {
    return TaskModel.query().where('user_id', user_id)
  }

  async save (task: Task): Promise<Task> {
    const data = await database.transaction(async trx => {
      return TaskModel.query(trx).insert({ ...task })
    })
    return data
  }
}

export { TaskRepository }
