import { Publisher, Subjects, TicketUpdatedEvent } from '@miranti/ticketing-common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
