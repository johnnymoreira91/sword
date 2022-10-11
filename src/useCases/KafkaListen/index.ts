import { KafkaServiceConsumer } from '@infra/services/KafkaConsumer/KafkaConsumer'
import { KafkaListenUseCase } from './KafkaListenUseCase'

const kafkaServiceConsumer = new KafkaServiceConsumer()

const kafkaListenUseCase = new KafkaListenUseCase(
  kafkaServiceConsumer
)

export {
  kafkaListenUseCase
}
