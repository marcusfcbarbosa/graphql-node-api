import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountController } from './controllers/account.controller';
import { CustomerController } from './controllers/customer.controller';
import { AddressController } from './controllers/address.controller';
import { PetsController } from './controllers/pet.controller';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
    imports:
        [
            HttpModule,
            CacheModule.register({ stdTTL: 100, checkperiod: 120 }),
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register(
                {
                    secretOrPrivateKey: process.env.SECRET_KEY,
                    signOptions: {
                        expiresIn: 3600
                    },
                }),
            MongooseModule.forFeature(
                [
                    {
                        name: 'Customer',
                        schema: CustomerSchema
                    },
                    {
                        name: 'User',
                        schema: UserSchema
                    }
                ])],
    controllers: [
        AccountController
        , CustomerController
        , AddressController
        , PetsController
    ],
    providers: [
        AccountService
        , CustomerService
        , AddressService
        , PetService
        , AuthService
        , JwtStrategy
    ]
})
export class BackofficeModule { }
