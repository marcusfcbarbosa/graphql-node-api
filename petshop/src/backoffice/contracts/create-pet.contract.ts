'use strict'
import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { Flunt } from 'src/utils/flunt';
import { Pet } from '../models/pet.model';

//Com  essa adequação vc torna a classe injetavel nos interceptadores de rota
@Injectable()
export class CreatePetContract implements IContract {
    errors: any[];
    validate(model: Pet): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.brand, 3, 'brand necessita de pelo menos 3 caracteres');
        flunt.hasMinLen(model.gender, 3, 'gender necessita de pelo menos 3 caracteres');
        flunt.hasMinLen(model.kind, 3, 'kind necessita de pelo menos 3 caracteres');
        flunt.hasMinLen(model.name, 3, 'name necessita de pelo menos 3 caracteres');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}