import { JsMsg } from 'nats'
import { Listener, TicketUpdatedEvent, Subjects } from '@miranti/ticketing-common'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  readonly name = 'ticket'

  onMessage(data: any, msg: JsMsg) {
    console.log('Ticket Updated:', { data })
    msg.ack()
  }
}