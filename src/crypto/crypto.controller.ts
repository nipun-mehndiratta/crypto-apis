import { Body, Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('/fiat')
  async handleFiat(@Body() payload: any) {
    return this.cryptoService.handleFiatExchange(payload);
  }

  @Get('/')
  async handleCrypto(@Body() payload: any) {
    return this.cryptoService.handleCryptoExchange(payload);
  }
}
