import { AckPolicy, JsMsg, NatsConnection } from 'nats'
import { Subjects } from './subjects'

interface Event {
  subject: Subjects
  data: any
}

export abstract class Listener<T extends Event> {
  private readonly client: NatsConnection

  abstract name: string
  abstract subject: T['subject']
  abstract onMessage(data: T['data'], msg: JsMsg): void

  constructor(client: NatsConnection) {
    this.client = client
  }

  async listen() {
    const { onMessage, subject: listenerSubject } = this

    const consumer = await this.getConsumer()
    consumer.consume({
      callback(msg: JsMsg) {
        const { subject, seq } = msg
        if (subject === listenerSubject) {
          const json = msg.json()
          console.log('Received', { seq, subject, json })
          onMessage(json, msg)
        }
      }
    })
    console.log('Started processing messages...')
  }

  private async getConsumer() {
    const { client, name } = this

    let consumer
    const js = client.jetstream()
    const durable_name = `${name}-events`
    try {
      console.log('Retrieving consumer:', { name, durable_name })
      consumer = await js.consumers.get(name, durable_name)
      // console.log('Retrieved', { consumer })
    } catch (err) {
      console.log('Creating:', { name, durable_name })
      const jsm = await client.jetstreamManager()
      const consumerInfo = await jsm.consumers.add(name, {
        durable_name,
        ack_policy: AckPolicy.Explicit,
      })
      console.log('Created:', { consumerInfo })
      consumer = await js.consumers.get(name, durable_name)
    }
    return consumer
  }
}