import { JetStreamClient } from 'nats'
import { Event } from './base-event'

export abstract class Publisher<T extends Event> {
  private readonly client: JetStreamClient

  abstract subject: T['subject']

  constructor(client: JetStreamClient) {
    this.client = client
  }

  async publish(data: T['data']) {
    const { client, subject } = this
    const event = await client.publish(subject, JSON.stringify(data))
    console.log('Published', { event })
  }
}