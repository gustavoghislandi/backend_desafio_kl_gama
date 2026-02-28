import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity('demandas')
export class DemandaEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro: Date;

  @Column({ type: 'date', name: 'data_vencimento', nullable: true })
  dataVencimento: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UserEntity;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'id_cliente' })
  cliente: ClientEntity;
}