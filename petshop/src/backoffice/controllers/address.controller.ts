import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { CreateAddressContract } from '../contracts/create-address.contract';
import { ValidatorInterceptor } from 'src/intercepetors/validator.interceptor';
import { Address } from 'cluster';
import { AddressType } from '../enums/address-type.enum';
import { Result } from '../models/result.model';


@Controller('v1/Address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddres(@Param('document') document, @Body() model: Address) {
        try {
            const addres = await this.addressService.create(document, model, AddressType.Billing);
            return new Result('Endereço de cobrança inserido com sucesso', true, addres, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.addressService.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }


    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddressgAdress(@Param('document') document, @Body() model: Address) {
        try {
            const addres = await this.addressService.create(document, model, AddressType.Shipping);
            return new Result('Endereço de entrega inserido com sucesso', true, addres, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}