import { AckPolicy, connect } from 'nats'

async function getConsumer() {
  const nc = await connect({ servers: 'localhost:4222' })

  const stream = 'ticket'
  const durable_name = 'tickets-stream'

  let consumer
  const js = nc.jetstream()
  try {
    consumer = await js.consumers.get(stream, durable_name)
    // console.log('Retrieved', { consumer })
  } catch (err) {
    const jsm = await nc.jetstreamManager()
    const consumerInfo = await jsm.consumers.add(stream, {
      durable_name,
      ack_policy: AckPolicy.Explicit,
    })
    console.log('Created:', { consumerInfo })
    consumer = await js.consumers.get(stream, durable_name)
  }
  return consumer
}

async function run() {
  const consumer = await getConsumer()

  // Get the consumer and process messages
  consumer.consume({
    callback(msg) {
      const { subject, seq } = msg
      const json = msg.json()
      console.log('Received', { seq, subject, json })
      msg.ack()
    }
  })
  console.log('Started processing messages...')
}

console.clear()
run().catch(console.error)
