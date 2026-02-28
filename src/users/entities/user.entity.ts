import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ClientEntity } from '../../clients/entities/client.entity';
import { DemandEntity } from '../../demands/entities/demand.entity';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number; // ID do usuário

  @Column({ length: 150 })
  name: string; // nome do usuário

  @Column({ unique: true })
  email: string; // e-mail do usuário

  @Column()
  password: string; // senha do usuário (hash)

  @Column({ default: true })
  active: boolean; // indica se está ativo

  @Column({ default: false })
  isManager: boolean; // indica se é gestor

  // Clientes que este usuário (ou gestor) pode gerenciar
  @ManyToMany(() => ClientEntity, client => client.users)
  @JoinTable({ name: 'user_clients' })
  clients: ClientEntity[];

  // Usuários que este gestor controla (incluindo ele mesmo)
  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user_managed_users' })
  managedUsers: UserEntity[];

  // Demandas que este usuário é responsável
  @OneToMany(() => DemandEntity, demand => demand.user)
  demands: DemandEntity[];
}