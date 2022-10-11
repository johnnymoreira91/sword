import { Task } from '@entities/Task'
import { KafkaServiceProducer } from '@infra/services/kafkaProducer/KafkaProducer'
import { ITaskRepository } from '@repositories/ITaskRepository'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { KafkaTopics } from '@shared/enum/KafkaTopics'
import { ICompleteTaskRequestDTO } from './CompleteTaskDTO'

class CompleteTaskUseCase {
  constructor (
    private taskRepository: ITaskRepository,
    private userRepository: IUsersRepository,
    private kafkaServiceProducer: KafkaServiceProducer
  ) { }

  async execute (data: ICompleteTaskRequestDTO): Promise<Task> {
    const findTask = await this.taskRepository.findByPublicId(data.public_id)
    if (!findTask) {
      throw new Error('Task not found')
    }

    if (!findTask.active) {
      throw new Error('This task has been ended before')
    }

    const user = await this.userRepository.findById(data.user_id)

    if (user.id !== findTask.user_id) {
      throw new Error('You cannot complete the task of other user')
    }

    const date = new Date()
    date.setHours(new Date().getHours() + 3)
    findTask.completed_at = date
    findTask.active = false
    const message = `The tech ${user.name} performed the task ${findTask.public_id} on date ${date}`
    await this.kafkaServiceProducer.start()
    await this.kafkaServiceProducer.sendMessage({ message: message }, KafkaTopics.messageUser)
    return this.taskRepository.edit(findTask.public_id, findTask)
  }
}

export { CompleteTaskUseCase }
