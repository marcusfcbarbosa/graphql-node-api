import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/room-booked.event';

export class Room extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }

    book(customerId: string, date:Date) {
        //Regras de negócio

        //ao finalizar a reserva de sala, dispara o evento
        this.apply(new RoomBookedEvent(customerId, this.id));//Manda email, whatever...
    }
}