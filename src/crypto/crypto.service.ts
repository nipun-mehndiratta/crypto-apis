import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Crypto } from './crypto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CryptoService {
  constructor(
    private httpService: HttpService,
    @Inject('CRYPTO_REPOSITORY')
    private cryptoRepository: Repository<Crypto>,
  ) {}

  async handleFiatExchange(payload) {
    try {
      const { cryptoAmount, fiatCurrency, cryptoCurrency } = payload;
      // console.log(payload)
      if (!cryptoAmount || !fiatCurrency || !cryptoCurrency) {
        return {
          message: 'cryptoAmount or fiatCurrency is missing',
          error: true,
        };
      }
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=${fiatCurrency}`;

      const options = {
        url,
        method: 'GET',
        headers: { accept: 'application/json' },
      };
      const response = await this.httpService.request(options).toPromise();
      if (response?.data) {
        const exchangeRate =
          response.data[`${cryptoCurrency}`][`${fiatCurrency}`];
        this.cryptoRepository.create({
          exchangeRate,
        });
        const fiatAmount = exchangeRate * cryptoAmount;
        return fiatAmount;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async handleCryptoExchange(payload) {
    try {
      const { fiatAmount, fiatCurrency, cryptoCurrency } = payload;

      if (!fiatAmount || !fiatCurrency || !cryptoCurrency) {
        return {
          message: 'cryptoAmount or fiatCurrency is missing',
          error: true,
        };
      }
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=${fiatCurrency}`;

      const options = {
        url,
        method: 'GET',
        headers: { accept: 'application/json' },
      };
      const response = await this.httpService.request(options).toPromise();
      if (response?.data) {
        const exchangeRate =
          response.data[`${cryptoCurrency}`][`${fiatCurrency}`];
        this.cryptoRepository.create({
          exchangeRate,
        });
        const cryptoAmount = fiatAmount / exchangeRate;
        return cryptoAmount.toFixed(2);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
