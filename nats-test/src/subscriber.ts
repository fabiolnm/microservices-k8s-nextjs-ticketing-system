import { connect } from 'nats'
import { TicketCreatedListener } from './events/ticket-created-listener'
import { connectionOptions } from './connection-options'

async function createClient() {
  return connect({
    ...connectionOptions,
    name: `ticket-listener`,
  })
}

console.clear()
createClient().then((client) => {
  new TicketCreatedListener(client).listen()
}).catch(console.error)