import { connect } from 'nats'

async function run() {
  const nc = await connect({ servers: 'localhost:4222' })

  // Get the consumer and process messages
  nc.subscribe('ticket.created', {
    queue: 'ticketsCreatedQueue',
    callback(err, msg) {
      if (err) {
        console.error('Error processing message:', err)
        return
      }
      console.log(
        'Received message on subject',
        msg.subject, msg.sid, msg.json()
      )
    }
  })

  console.log('Started processing messages...')
}

console.clear()
run().catch(console.error)
