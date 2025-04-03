import { JetStreamClient, connect as natsConnect } from 'nats'

class NatsWrapper {
  private _client?: JetStreamClient

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting')
    }
    return this._client
  }

  async connect(clusterId: string, url: string) {
    const nc = await natsConnect({ name: clusterId, servers: url })
    process.on('SIGINT', () => nc.close())
    process.on('SIGTERM', () => nc.close())

    const jsm = await nc.jetstreamManager()
    console.info('Adding stream', clusterId)
    jsm.streams.add({ name: clusterId, subjects: [`${clusterId}.*`] })

    this._client = nc.jetstream()
    console.info('Connected to NATS')
  }
}

export const natsWrapper = new NatsWrapper()