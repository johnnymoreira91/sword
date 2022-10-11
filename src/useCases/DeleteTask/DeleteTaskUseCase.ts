import { ITaskRepository } from '@repositories/ITaskRepository'
import { IDeleteTaskRequestDTO } from './DeleteTaskDTO'

class DeleteTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository
  ) {}

  async execute (data: IDeleteTaskRequestDTO): Promise<void> {
    const taskExist = await this.taskRepository.findByPublicId(data.task_public_id)
    if (!taskExist) {
      throw new Error('Task not found')
    }

    if (data.permission < 2) {
      throw new Error('You are not able to delete this task')
    }

    await this.taskRepository.deleteById(data.task_public_id)
  }
}

export { DeleteTaskUseCase }
