import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { CreditCard } from '../models/CreditCard.model';


@Injectable()
export class CustomerService {
    //Toda vez que criar uma instancia do serviço, ele ja cria uma instancia do Model por padrão
    //Singlton a nivel de classe e nao de aplicacao
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
    }

    async create(data: Customer): Promise<Customer> {
        const user = new this.model(data);
        return await user.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document: document }, data);
    }

    async findAll(): Promise<Customer[]> {
        return await this.model.find({}).exec();
        // return await this.model.find({})
        // .sort('name')
        // .exec();//ordenando pelo nome de maneira crescente  -name (maneira decrescente)
        //return await this.model.find({}, 'name document email').exec();
        // return await this.model.find({}, '-name').exec();
    }

    async findAllByDocument(document: string): Promise<Customer[]> {
        return await this.model.find({ document: document })
            .populate('user', '-password')
            .exec();
    }
    
    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(model.query,
                model.fields,
                {
                    skipe: model.skip,
                    take: model.take
                })
            .sort(model.sort)
            .exec();
    }


    async saveOrUpdateCrediCart(document: string, data: CreditCard): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate(
            { document: document },
            {
                $set: {
                    card: data
                }
            },options
        );
    }
}