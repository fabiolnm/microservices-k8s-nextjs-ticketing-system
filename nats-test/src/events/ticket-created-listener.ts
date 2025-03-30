import { JsMsg } from 'nats'
import { Listener } from './base-listener'
import { TicketCreatedEvent } from './ticket-created-event'
import { Subjects } from './subjects'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  readonly name = 'ticket'

  onMessage(data: any, msg: JsMsg) {
    console.log('Ticket Created:', { data })
    msg.ack()
  }
}
