import { Task } from '@entities/Task'
import { ITaskRepository } from '@repositories/ITaskRepository'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateTaskRequestDTO } from './CreateTaskDTO'

class CreateTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute (data: ICreateTaskRequestDTO): Promise<Task> {
    const user = await this.userRepository.findById(data.public_id)
    if (!user) {
      throw new Error('User not found')
    }

    const task = new Task({
      user_id: user.id,
      summary: data.summary,
      active: data.active
    })
    task.user_id = user.id
    return this.taskRepository.save(task)
  }
}

export { CreateTaskUseCase }
