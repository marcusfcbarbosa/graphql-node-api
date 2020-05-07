import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class SharedJwtAuthGuard extends AuthGuard() {

    canActivate(context: ExecutionContext) {
        //aqui tem acesso ao boyd, headers da requisição
        return super.canActivate(context);
    }

    //depoois que a requisição ja foi processada
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}