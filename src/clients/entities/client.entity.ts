import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class ClientEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ default: true })
  ativo: boolean;

}