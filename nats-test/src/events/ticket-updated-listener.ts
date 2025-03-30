import { JsMsg } from 'nats'
import { Listener } from './base-listener'
import { TicketUpdatedEvent } from './ticket-updated-event'
import { Subjects } from './subjects'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  readonly name = 'ticket'

  onMessage(data: any, msg: JsMsg) {
    console.log('Ticket Updated:', { data })
    msg.ack()
  }
}