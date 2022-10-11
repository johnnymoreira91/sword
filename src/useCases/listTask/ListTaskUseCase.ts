import { Task } from '@entities/Task'
import { ITaskRepository } from '@repositories/ITaskRepository'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { IListTaskRequestDTO } from './ListTaskDTO'

class ListTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute (data: IListTaskRequestDTO): Promise<Task[]> {
    if (data.permission < 2) {
      const user = await this.userRepository.findById(data.user_id)
      if (!user) {
        throw new Error('User Not found')
      }

      const userTasks = await this.taskRepository.listByUser(user.id)
      if (userTasks.length === 0) {
        throw new Error('Any Task for this user Found')
      }

      return userTasks
    }

    const tasks = await this.taskRepository.list()

    if (tasks.length === 0) {
      throw new Error('Any task found')
    }

    return tasks
  }
}

export { ListTaskUseCase }
