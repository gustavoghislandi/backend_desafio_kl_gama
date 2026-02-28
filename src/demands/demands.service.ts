import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandEntity } from './entities/demand.entity';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util';

@Injectable()
export class DemandsService {

  constructor(
    @InjectRepository(DemandEntity)
    private readonly demandRepository: Repository<DemandEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // cria uma nova demanda
  async create(dto: CreateDemandDto) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuário responsável não encontrado');

    const client = await this.clientRepository.findOne({ where: { id: dto.clientId } });
    if (!client) throw new NotFoundException('Cliente não encontrado');

    const demand = this.demandRepository.create({ ...dto, user, client });

    try {
      return await this.demandRepository.save(demand);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  // lista todas as demandas
  async findAll() {
    return this.demandRepository.find({ relations: ['user', 'client'] });
  }

  // busca uma demanda pelo ID
  async findOne(id: number) {
    const demand = await this.demandRepository.findOne({ where: { id }, relations: ['user', 'client'] });
    if (!demand) throw new NotFoundException('Demanda não encontrada');
    return demand;
  }

  // atualiza uma demanda
  async update(id: number, dto: UpdateDemandDto) {
    const demand = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepository.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('Usuário responsável não encontrado');
      demand.user = user;
    }

    if (dto.clientId) {
      const client = await this.clientRepository.findOne({ where: { id: dto.clientId } });
      if (!client) throw new NotFoundException('Cliente não encontrado');
      demand.client = client;
    }

    const updated = this.demandRepository.merge(demand, dto);

    try {
      return await this.demandRepository.save(updated);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  // remove uma demanda
  async remove(id: number) {
    const demand = await this.findOne(id);
    return this.demandRepository.remove(demand);
  }
}