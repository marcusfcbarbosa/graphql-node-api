import { NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "src/shared/interfaces/jwt-payload.interface";
import { Result } from "src/backoffice/models/result.model";


export class RoleInterceptor implements NestInterceptor {

    constructor(public roles: string[]) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(String(role))) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            throw new HttpException(new Result('Acesso não autorizado', false, null, null),
                HttpStatus.UNAUTHORIZED);
        }
        return next.handle();
    }
}