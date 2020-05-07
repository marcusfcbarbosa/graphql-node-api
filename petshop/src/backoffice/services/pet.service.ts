import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';


@Injectable()
export class PetService {
    //Toda vez que criar uma instancia do serviço, ele ja cria uma instancia do Model por padrão
    //Singlton a nivel de classe e nao de aplicacao
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
    }
    
    async createPet(document: string, data: Pet): Promise<Customer> {
        const options = { upsert: true, new: true };//new: true esse trecho atribui um id ao ser inserido
        return await this.model.findOneAndUpdate(
            { document }
            , {
                $push: {//push pois estamos trabalhando com array (NÃO FUNCIONA PARA UPDATE)
                    pets: data
                }
            }
            , options);
    }

    //Atualização de subdocument
    async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate(
            {
                document,
                'pets._id': id
            },
            {
                $set: {
                    'pets.$': data
                }
            }
        );
    }
}