import { Publisher, Subjects, TicketCreatedEvent } from '@miranti/ticketing-common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
