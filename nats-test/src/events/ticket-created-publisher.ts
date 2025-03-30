import { Publisher, TicketCreatedEvent, Subjects } from '@miranti/ticketing-common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
