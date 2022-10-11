import { Task } from '@entities/Task'
import { ITaskRepository } from '@repositories/ITaskRepository'
import { IListTaskRequestDTO } from './ListTaskDTO'

class ListTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository
  ) {}

  async execute (data: IListTaskRequestDTO): Promise<Task[]> {
    if (data.permission < 2) {
      const userTasks = await this.taskRepository.listByUser(data.user_id)
      if (!userTasks) {
        throw new Error('Any Task for this user Found')
      }

      return userTasks
    }

    const tasks = await this.taskRepository.list()

    if (!tasks) {
      throw new Error('Any task found')
    }

    return tasks
  }
}

export { ListTaskUseCase }
