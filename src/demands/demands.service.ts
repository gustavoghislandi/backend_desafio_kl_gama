// src/demands/demands.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandEntity } from './entities/demand.entity';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util';
import { plainToInstance } from 'class-transformer';
import { DemandResponseDto } from './dto/demand-response.dto';


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

  /** =====================================================
   * MÉTODOS EXCLUSIVOS PARA CLIENTE (PROTEGIDOS PELO TOKEN)
   * ===================================================== */

  async createByClient(
    dto: CreateDemandDto,
    clientId: number,
  ): Promise<DemandResponseDto> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) throw new NotFoundException('Cliente não encontrado');

    let user: UserEntity | null = null;

    if (dto.userId) {
      user = await this.userRepository.findOne({
        where: { id: dto.userId },
        relations: ['clients'],
      });

      if (!user)
        throw new NotFoundException('Usuário responsável não encontrado');

      const belongsToClient = user.clients.some(
        (c) => c.id === clientId,
      );

      if (!belongsToClient)
        throw new NotFoundException(
          'Usuário não pertence a este cliente',
        );
    }

    const demand = this.demandRepository.create({
      description: dto.description,
      createdAt: dto.createdAt,
      dueDate: dto.dueDate,
      client,
      user,
    });

    try {
      const saved = await this.demandRepository.save(demand);
      return plainToInstance(DemandResponseDto, saved);
    } catch (error) {
      handleTypeOrmError(error);
      throw error; // <<< garante que algo é lançado ou retornado para não acusar erro no VS Code
    }
  }

  async findAllByClient(
    clientId: number,
  ): Promise<DemandResponseDto[]> {
    const demands = await this.demandRepository.find({
      where: { client: { id: clientId } },
      relations: ['user', 'client'],
    });

    return demands.map((d) =>
      plainToInstance(DemandResponseDto, d),
    );
  }

  async findOneByClient(
    id: number,
    clientId: number,
  ): Promise<DemandResponseDto> {
    const demand = await this.demandRepository.findOne({
      where: {
        id,
        client: { id: clientId },
      },
      relations: ['user', 'client'],
    });

    if (!demand)
      throw new NotFoundException(
        'Demanda não encontrada para este cliente',
      );

    return plainToInstance(DemandResponseDto, demand);
  }

  async updateByClient(
    id: number,
    dto: UpdateDemandDto,
    clientId: number,
  ): Promise<DemandResponseDto> {
    const demand = await this.demandRepository.findOne({
      where: {
        id,
        client: { id: clientId },
      },
      relations: ['user', 'client'],
    });

    if (!demand)
      throw new NotFoundException(
        'Demanda não encontrada para este cliente',
      );

    if (dto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: dto.userId },
        relations: ['clients'],
      });

      if (!user)
        throw new NotFoundException(
          'Usuário responsável não encontrado',
        );

      const belongsToClient = user.clients.some(
        (c) => c.id === clientId,
      );

      if (!belongsToClient)
        throw new NotFoundException(
          'Usuário não pertence a este cliente',
        );

      demand.user = user;
    }

    this.demandRepository.merge(demand, {
      description: dto.description ?? demand.description,
      createdAt: dto.createdAt ?? demand.createdAt,
      dueDate: dto.dueDate ?? demand.dueDate,
    });

    try {
      const saved = await this.demandRepository.save(demand);
      return plainToInstance(DemandResponseDto, saved);
    } catch (error) {
      handleTypeOrmError(error);
      throw error; // <<< garante que algo é lançado ou retornado para não acusar erro no VS Code
    }
  }

  async removeByClient(
    id: number,
    clientId: number,
  ): Promise<DemandResponseDto> {
    const demand = await this.demandRepository.findOne({
      where: {
        id,
        client: { id: clientId },
      },
      relations: ['user', 'client'],
    });

    if (!demand)
      throw new NotFoundException(
        'Demanda não encontrada para este cliente',
      );

    const removed = await this.demandRepository.remove(demand);

    return plainToInstance(DemandResponseDto, removed);
  }

  /** ============================================
   * MÉTODOS GENÉRICOS (ADMIN / GESTOR)
   * ============================================ */

  async create(dto: CreateDemandDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });

    const client = await this.clientRepository.findOne({
      where: { id: (dto as any).clientId },
    });

    if (!user)
      throw new NotFoundException(
        'Usuário responsável não encontrado',
      );

    if (!client)
      throw new NotFoundException('Cliente não encontrado');

    const demand = this.demandRepository.create({
      ...dto,
      user,
      client,
    });

    try {
      return await this.demandRepository.save(demand);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  async findAll() {
    return this.demandRepository.find({
      relations: ['user', 'client'],
    });
  }

  async findOne(id: number) {
    const demand = await this.demandRepository.findOne({
      where: { id },
      relations: ['user', 'client'],
    });

    if (!demand)
      throw new NotFoundException('Demanda não encontrada');

    return demand;
  }

  async update(id: number, dto: UpdateDemandDto) {
    const demand = await this.findOne(id);

    this.demandRepository.merge(demand, dto);

    try {
      return await this.demandRepository.save(demand);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  async remove(id: number) {
    const demand = await this.findOne(id);
    return this.demandRepository.remove(demand);
  }
}