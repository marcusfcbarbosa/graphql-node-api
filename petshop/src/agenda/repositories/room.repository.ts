import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {

    async checkAvailability(id: string, date: Date): Promise<Room> {

        return new Room('342423243');
    }

    async book(room: Room) {
        console.log('RoomRepository: Sala Reservada');
    }

    async findeOneById(id: string): Promise<Room> {
        console.log('RoomRepository: findeOneById- Recuperando a sala..');
        return new Room('123213');
    }

}