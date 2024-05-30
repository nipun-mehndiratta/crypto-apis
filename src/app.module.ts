import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CryptoModule, DatabaseModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
