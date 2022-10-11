import { kafkaListenUseCase } from '.'

async function KafkaListenDTO () {
  await kafkaListenUseCase.execute()
}

export { KafkaListenDTO }
