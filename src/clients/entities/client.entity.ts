import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { DemandEntity } from '../../demands/entities/demand.entity';
import { Exclude } from 'class-transformer';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude() // Não retorna nas queries normais
  @Column({ select: false }) // dupla garantia de não retornar nas queries normais, precisa ser explícito.
  password: string;

  @Column({ default: true })
  active: boolean;


  // Usuários que podem gerenciar este cliente
  @ManyToMany(() => UserEntity, user => user.clients)
  users: UserEntity[];

  // Demandas deste cliente
  @OneToMany(() => DemandEntity, demand => demand.client)
  demands: DemandEntity[];
}