import { DataSource } from 'typeorm';
import { Crypto } from './crypto.entity';

export const cryptoProviders = [
  {
    provide: 'CRYPTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Crypto),
    inject: ['DATA_SOURCE'],
  },
];
