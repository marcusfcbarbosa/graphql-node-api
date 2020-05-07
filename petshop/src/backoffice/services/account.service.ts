import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript'
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';


@Injectable()
export class AccountService {
    //Toda vez que criar uma instancia do serviço, ele ja cria uma instancia do Model por padrão
    //Singlton a nivel de classe e nao de aplicacao
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Customer') private readonly customerModel: Model<Customer>, ) {
    }

    //Assincrono
    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async authenticate(username: string, password: string): Promise<Customer> {
        var customer = await this.customerModel
            .findOne({ document: username })
            .populate('user')
            .exec();

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() == customer.user.password.toString()) {
            return customer;
        } else {
            return null;
        }
    }
    
    async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndupdate({ username }, data);
    }
}