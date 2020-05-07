import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.event";

@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {

    handle(event: RoomBookedEvent) {
        console.log(' RoomBookedHandler : RoomBookedEvent:handle - Manipulando o evento de Room Booked');
    }
}