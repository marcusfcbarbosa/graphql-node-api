import { Injectable, ExecutionContext, HttpException, HttpStatus, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IContract } from 'src/shared/icontract';
import { Result } from 'src/backoffice/models/result.model';


@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(
        public contract: IContract) { //Dessa forma, qualquer classe que herdar de IContract, pode ser chamada aqui
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result(
                    'ValidatorInterceptor',
                    false,
                    null,
                    this.contract.errors
                ), HttpStatus.BAD_REQUEST);
        }
        return next.handle();
    }
}
