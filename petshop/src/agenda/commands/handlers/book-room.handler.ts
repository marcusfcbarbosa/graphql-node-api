import { BooKRoomComand } from "../book-room.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RoomRepository } from "../../repositories/room.repository";


@CommandHandler(BooKRoomComand)
export class BookRoomHandler implements ICommandHandler<BooKRoomComand>{
    constructor(
        private readonly repository: RoomRepository
    ) {

    }

    async execute(command: BooKRoomComand): Promise<any> {
        console.log('BookRoomHandler: execute - Executando o commando...');
        const room = await this.repository.findeOneById(command.roomId);
        room.book(command.customerId);//se fosse em C# isso daqui seria a entidade
        //commit();
    }
}