import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity('demands')
export class DemandEntity {

  @PrimaryGeneratedColumn()
  id: number; // ID da demanda

  @Column()
  description: string; // descrição da demanda

  @Column()
  createdAt: Date; // data de cadastro

  @Column({ nullable: true })
  dueDate?: Date; // data de vencimento

  // Usuário responsável pela demanda
  @ManyToOne(() => UserEntity, user => user.demands, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // Cliente ao qual a demanda pertence
  @ManyToOne(() => ClientEntity, client => client.demands, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}