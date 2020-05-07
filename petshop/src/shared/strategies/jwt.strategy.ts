import { Strategy, ExtractJwt } from 'passport-jwt'

import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'ed97d99f'
            }
        );
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}