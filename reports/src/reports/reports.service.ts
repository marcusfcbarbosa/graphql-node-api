import { Product } from "./models/product.model";
import { ProductArgs } from "./dtos/product-args.dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportService {

    async findOneById(id: string): Promise<Product> {
        return {
            id: '1234',//Aqui pode fazer com Mysql, MongoDB,...etc
            title: '33423423',
            descritpion: 'wewerwrew'
        } as Product;
    }

    async findAll(args: ProductArgs): Promise<Product[]> {
        //args.skip
        return [
            {
                id: '1234',
                title: '33423423',
                descritpion: 'wewerwrew'
            }
        ] as Product[];
    }
}