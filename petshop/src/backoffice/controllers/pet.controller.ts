import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { CreatePetContract } from '../contracts/create-pet.contract';
import { ValidatorInterceptor } from 'src/intercepetors/validator.interceptor';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';


@Controller('v1/Pets')
export class PetsController {
    constructor(private readonly petService: PetService) {    }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async addPet(@Param('document') document, @Body() model: Pet) {
        try {
            const Pet = await this.petService.createPet(document, model);
            return new Result('Pet inserido com sucesso', true, Pet, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            const Pet = await this.petService.updatePet(document, id, model);
            return new Result('Pet Atualizado com sucesso', true, Pet, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
   
}