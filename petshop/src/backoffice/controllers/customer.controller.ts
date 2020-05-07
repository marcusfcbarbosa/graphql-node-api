import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus, CacheInterceptor } from '@nestjs/common';
import { Md5 } from 'md5-typescript'
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';
import { Result } from '../models/result.model';
import { CreateCustomerContract } from '../contracts/cutomer.contracts';
import { ValidatorInterceptor } from 'src/intercepetors/validator.interceptor';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';
import { CreditCard } from '../models/CreditCard.model';
import { CreateCreditCardContract } from '../contracts/create-creditCard.contract';
import { UpdateCustomerContract } from '../contracts/update-customer.contract';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { QueryContract } from '../contracts/query.contract';
import { QueryDto } from '../dtos/query.dto';


@Controller('v1/Customers')
export class CustomerController {
    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService

    ) {
    }

    @Get()
    @UseInterceptors(CacheInterceptor)//cacheando requisições de get
    async get() {
        try {
            const customers = await this.customerService.findAll();
            return new Result('', true, customers, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':document')
    async getByDocument(@Param('document') document: string) {
        try {
            const customers = await this.customerService.findAllByDocument(document);
            return new Result('', true, customers, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }


    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() body: CreateCustomerDto) {
        try {
            const password = await Md5.init(`${body.password}${process.env.SALT_KEY}`);

            const user = await this.accountService.create(new User(
                body.username,
                body.email,
                password,
                true,
                body.roles));
            const customer = new Customer(body.name, body.document, body.email, user, [], null, null, null);
            await this.customerService.create(customer);

            return new Result('Inserido com sucesso', true, body.roles, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document: string, @Body() model: CreditCard) {
        try {
            let customer = await this.customerService.saveOrUpdateCrediCart(document, model);
            return new Result('Cartão de crédito inserido com sucesso!!', true, customer, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async updateCustomer(@Param('document') document: string, @Body() body: UpdateCustomerDto) {
        try {
            let customer = await this.customerService.update(document, body);
            return new Result('Customer atualizado com sucesso', true, customer, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customer = await this.customerService.query(model);
        return new Result(null, true, customer, null);
    }
}