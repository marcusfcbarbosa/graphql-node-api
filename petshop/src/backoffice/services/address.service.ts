import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Address } from 'cluster';
import { AddressType } from '../enums/address-type.enum';



@Injectable()
export class AddressService {
    //Toda vez que criar uma instancia do serviço, ele ja cria uma instancia do Model por padrão
    //Singlton a nivel de classe e nao de aplicacao
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>,
        private readonly httpService: HttpService
    ) {
    }

    async create(document: string, data: Address, type: AddressType): Promise<Customer> {
        const options = { upsert: true };//caso nao encontre o registro ele inseri um novo, se tive atualiza
        if (type == AddressType.Billing) {
            return await this.model.findOneAndUpdate(
                { document }
                , {
                    $set: {
                        billingAddress: data
                    }
                }
                , options);
        } else {
            return await this.model.findOneAndUpdate(
                { document }
                , {
                    $set: {
                        shippingAddress: data
                    }
                }
                , options);
        }
    }

    getAddressByZipCode(zipcode: string) {
        const url = `https://viacep.com.br/ws/${zipcode}/json/`;
        //Nest usa o axios para fazer essa requisição e nao trabaljha com assincronismo
        return this.httpService.get(url);
    }
}