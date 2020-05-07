import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaModule } from './agenda/agenda.module';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'mfcb4625',
        database: '7180',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }
    ),
    AgendaModule, BackofficeModule, StoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
