import { Publisher, TicketUpdatedEvent, Subjects } from '@miranti/ticketing-common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}