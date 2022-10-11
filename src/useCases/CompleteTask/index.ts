import { KafkaServiceProducer } from '@infra/services/kafkaProducer/KafkaProducer'
import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CompleteTaskController } from './CompleteTaskController'
import { CompleteTaskUseCase } from './CompleteTaskUseCase'

const taskRepository = new TaskRepository()
const userRepository = new UsersRepository()

const kafkaServiceProducer = new KafkaServiceProducer()

const completeTaskUseCase = new CompleteTaskUseCase(
  taskRepository,
  userRepository,
  kafkaServiceProducer
)

const completeTaskController = new CompleteTaskController(
  completeTaskUseCase
)

export {
  completeTaskController,
  completeTaskUseCase
}
