import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ResultDto } from '../dtos/result.dto';
import { Product } from '../entities/product.entity';


@Controller('v1/Products')
export class ProductController {
    constructor(private readonly productService: ProductService
    ) { }

    @Get()
    async get() {
        try {
            const products = await this.productService.get();
            return new ResultDto('', true, products, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.productService.post(model);
            return new ResultDto('', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.productService.put(id, model);
            return new ResultDto('', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.productService.delete(id);
            return new ResultDto('', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}