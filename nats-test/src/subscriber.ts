import { connect } from 'nats'
import { TicketCreatedListener } from './events/ticket-created-listener'
import { TicketUpdatedListener } from './events/ticket-updated-listener'
import { connectionOptions } from './connection-options'

async function createClient() {
  return connect({
    ...connectionOptions,
    name: `ticket-listener`,
  })
}

console.clear()
createClient().then(async (client) => {
  // Listen for ticket created events
  new TicketCreatedListener(client).listen()

  // Listen for ticket updated events
  new TicketUpdatedListener(client).listen()
}).catch(console.error)