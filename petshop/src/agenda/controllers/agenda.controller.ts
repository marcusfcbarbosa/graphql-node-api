import { RoomBookService } from "../services/room-book.service";
import { Controller, Post, Body } from "@nestjs/common";

@Controller('v1/rooms')
export class AgendaController {
    constructor(
        private readonly service: RoomBookService
    ) { }

    @Post()
    async Book(@Body() body: any) {
        console.log('AgendaController: Book - Iniciando a requisição');
        await this.service.Book(body.customer, body.room);
    }
}