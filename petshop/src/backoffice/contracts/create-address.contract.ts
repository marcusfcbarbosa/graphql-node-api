'use strict'
import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { Flunt } from 'src/utils/flunt';
import { Address } from '../models/address.model';


//Com  essa adequação vc torna a classe injetavel nos interceptadores de rota
@Injectable()
export class CreateAddressContract implements IContract {
    errors: any[];
    validate(model: Address): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.city, 3, 'Cidade necessita de pelo menos 3 caracteres');
        flunt.hasMinLen(model.state, 2, 'Estado necessita de pelo menos 2 caracteres');
        flunt.hasMinLen(model.complement, 5, 'Complemento necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(model.country, 2, 'País necessita de pelo menos 2 caracteres');
        flunt.hasMinLen(model.neighborhood, 1, 'Bairro necessita de pelo menos 1 caracteres');
        flunt.hasMinLen(model.number, 1, 'Numero necessita de pelo menos 1 caracteres');
        flunt.hasMinLen(model.street, 3, 'Rua necessita de pelo menos 3 caracteres');
        flunt.hasMinLen(model.zipCode, 8, 'CEP necessita de pelo menos 8 caracteres');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}