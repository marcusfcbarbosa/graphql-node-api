'use strict'
import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { QueryDto } from '../dtos/query.dto';
import { Flunt } from 'src/utils/flunt';

//Com  essa adequação vc torna a classe injetavel nos interceptadores de rota
@Injectable()
export class QueryContract implements IContract {

    errors: any[];

    validate(_dto: QueryDto): boolean {

        if(!_dto.query){
            _dto.query = {};
        }

        const flunt = new Flunt();
        flunt.isGreatherThan(_dto.take, 1000, 'Sua query não pode exceder 100 registos');
        
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}