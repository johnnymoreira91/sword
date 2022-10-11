import { Task } from '@entities/Task'
import { ITaskRepository } from '@repositories/ITaskRepository'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { IEditTaskRequestDTO } from './EditTaskDTO'

class EditTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository
  ) {}

  async execute (data: IEditTaskRequestDTO): Promise<Task> {
    const findTask = await this.taskRepository.findByPublicId(data.public_id)

    if (!findTask) {
      throw new Error('Task not found')
    }

    findTask.summary = data.summary
    const dataTask = await this.taskRepository.edit(findTask.public_id, findTask)
    return dataTask
  }
}

export { EditTaskUseCase }
