'use strict'
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { BooKRoomComand } from "../commands/book-room.command";

@Injectable()
export class RoomBookService {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    async Book(command: BooKRoomComand) {
        console.log('RoomBookService: Book - Executando o serviço...');
        return await this.commandBus.execute(//pode-se enfileirar, inserir mais de um command
            command
        );
    }
}