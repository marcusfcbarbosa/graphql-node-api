import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";


@Injectable()
export class RoomRepository {
    async findeOneById(id: string): Promise<Room> {
        console.log('RoomRepository: findeOneById- Recuperando a sala..');
        return new Room('123213');
    }
}