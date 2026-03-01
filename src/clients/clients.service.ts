import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // Cria novo cliente com hash de senha
  async create(dto: CreateClientDto): Promise<ClientResponseDto> {
    const client = this.clientRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    try {
      const saved = await this.clientRepository.save(client);
      return plainToInstance(ClientResponseDto, saved); // converte para DTO de saída
    } catch (error) {
      handleTypeOrmError(error);
      throw error; // <<< garante que algo é lançado ou retornado para não acusar erro no VS Code
    }
  }

  // Lista todos os clientes
  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientRepository.find();
    return clients.map(c => plainToInstance(ClientResponseDto, c));
  }

  // Busca cliente por ID
  async findOne(id: number): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return plainToInstance(ClientResponseDto, client);
  }

  // Atualiza cliente
  async update(id: number, dto: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente não encontrado');

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = this.clientRepository.merge(client, dto);

    try {
      const saved = await this.clientRepository.save(updated);
      return plainToInstance(ClientResponseDto, saved);
    } catch (error) {
      handleTypeOrmError(error);
      throw error; // <<< garante que algo é lançado ou retornado para não acusar erro no VS Code
    }
  }

  // Remove cliente
  async remove(id: number): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente não encontrado');
    const removed = await this.clientRepository.remove(client);
    return plainToInstance(ClientResponseDto, removed);
  }

  // Busca cliente pelo email para autenticação
  async findByEmail(email: string) {
    return this.clientRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name', 'active'],
    });
  }
}