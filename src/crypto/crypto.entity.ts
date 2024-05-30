import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  exchangeRate: string;
}
