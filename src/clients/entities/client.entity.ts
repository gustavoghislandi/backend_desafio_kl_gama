import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { DemandEntity } from '../../demands/entities/demand.entity';

@Entity('clients')
export class ClientEntity {

  @PrimaryGeneratedColumn()
  id: number; // ID do cliente

  @Column({ length: 150 })
  name: string; // nome do cliente

  @Column({ default: true })
  active: boolean; // indica se está ativo

  // Usuários que podem gerenciar este cliente
  @ManyToMany(() => UserEntity, user => user.clients)
  users: UserEntity[];

  // Demandas deste cliente
  @OneToMany(() => DemandEntity, demand => demand.client)
  demands: DemandEntity[];
}