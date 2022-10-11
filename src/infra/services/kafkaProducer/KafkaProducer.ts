import { KafkaTopics } from '@shared/enum/KafkaTopics'
import { Kafka, Message, Producer, ProducerBatch, TopicMessages } from 'kafkajs'
import dotenv from 'dotenv'
dotenv.config()

interface CustomMessageFormat { a: string }

class KafkaServiceProducer {
  private producer: Producer

  constructor () {
    this.producer = this.createProducer()
  }

  public async start (): Promise<boolean> {
    try {
      await this.producer.connect()
      return true
    } catch (error) {
      const red = '\u001b[31m'
      console.log(red + 'Error connecting the producer: ', error)
      return false
    }
  }

  public async shutdown (): Promise<void> {
    await this.producer.disconnect()
  }

  public async sendBatch (messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        value: JSON.stringify(message)
      }
    })

    const topicMessages: TopicMessages = {
      topic: 'producer-topic',
      messages: kafkaMessages
    }

    const batch: ProducerBatch = {
      topicMessages: [topicMessages]
    }

    await this.producer.sendBatch(batch)
  }

  public async sendMessage (data: Object, topic: KafkaTopics) {
    await this.producer.send({
      topic: topic,
      messages: [
        { value: JSON.stringify(data) }
      ]
    })
  }

  private createProducer () : Producer {
    const kafka = new Kafka({
      clientId: 'kafka-microServices',
      brokers: ['localhost:9092']
    })

    return kafka.producer()
  }
}

export { KafkaServiceProducer }
