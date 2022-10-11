import { KafkaServiceConsumer } from '@infra/services/KafkaConsumer/KafkaConsumer'
import { KafkaTopics } from '@shared/enum/KafkaTopics'

class KafkaListenUseCase {
  constructor (
    private kafkaServiceConsumer: KafkaServiceConsumer
  ) {}

  async execute (): Promise<void> {
    await this.kafkaServiceConsumer.startConsumer(KafkaTopics.messageUser)
  }
}

export { KafkaListenUseCase }
