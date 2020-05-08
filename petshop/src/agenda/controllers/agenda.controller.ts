import { RoomBookService } from "../services/room-book.service";
import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from "@nestjs/common";
import { BookRoomDto } from "../dtos/book-room.dto";
import { SharedJwtAuthGuard } from "src/shared/guards/shared.auth.guard";
import { BooKRoomComand } from "../commands/book-room.command";
import { Result } from "src/backoffice/models/result.model";

@Controller('v1/rooms')
export class AgendaController {
    constructor(
        private readonly service: RoomBookService
    ) { }

    @Post()
    @UseGuards(SharedJwtAuthGuard)//tem que possuir token
    async Book(@Req() req, @Body() model: BookRoomDto) {
        // console.log('AgendaController: Book - Iniciando a requisição');
        // await this.service.Book(body.customer, body.room);
        try{
            var command = new BooKRoomComand(req.user.document,model.roomId, model.date);
            await this.service.Book(command);

        }catch(error){
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}