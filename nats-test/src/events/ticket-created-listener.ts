import { JsMsg } from 'nats'
import { Listener, TicketCreatedEvent, Subjects } from '@miranti/ticketing-common'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  readonly name = 'ticket'

  onMessage(data: any, msg: JsMsg) {
    console.log('Ticket Created:', { data })
    msg.ack()
  }
}
