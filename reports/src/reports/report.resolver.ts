import { ReportService } from "./reports.service";
import { Resolver, Args, Query } from "@nestjs/graphql";
import { Product } from "./models/product.model";
import { ProductArgs } from "./dtos/product-args.dtos";


@Resolver(of => Product)
export class ReportsResolver {
    constructor(private readonly service: ReportService) { }

    @Query(returns => Product)
    async product(@Args('id') id: string): Promise<Product> {
        const product = await this.service.findOneById(id);
        return product;
    }


    @Query(returns => [Product])
    async products(@Args() args: ProductArgs): Promise<Product[]> {
        return await this.service.findAll(args);
    }
}