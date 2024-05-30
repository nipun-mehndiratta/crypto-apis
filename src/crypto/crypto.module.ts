import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { cryptoProviders } from './crypto.providers';

@Module({
  providers: [...cryptoProviders, CryptoService],
  controllers: [CryptoController],
  imports: [HttpModule, DatabaseModule],
})
export class CryptoModule {}
