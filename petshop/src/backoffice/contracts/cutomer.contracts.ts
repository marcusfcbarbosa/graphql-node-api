'use strict'
import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { Flunt } from 'src/utils/flunt';


//Com  essa adequação vc torna a classe injetavel nos interceptadores de rota
@Injectable()
export class CreateCustomerContract implements IContract {

    errors: any[];

    validate(_dto: CreateCustomerDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(_dto.name, 5, 'Nome necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(_dto.username, 5, 'Nome necessita de pelo menos 5 caracteres');
        flunt.isEmail(_dto.email, 'e-mail inválido');
        flunt.isCpf(_dto.document, 'CPF inválido');
        flunt.hasMinLen(_dto.password, 6, 'senha necessita de pelo menos 6 caracteres');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}