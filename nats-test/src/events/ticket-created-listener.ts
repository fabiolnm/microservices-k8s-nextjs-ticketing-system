import { JsMsg } from 'nats'
import { Listener } from './base-listener'

export class TicketCreatedListener extends Listener {
  name = 'ticket'
  subject = 'ticket.created'

  onMessage(data: any, msg: JsMsg) {
    console.log('Ticket Created:', { data })
    msg.ack()
  }
}
