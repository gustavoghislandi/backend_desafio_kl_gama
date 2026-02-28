import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // cria um novo cliente
  async create(dto: CreateClientDto) {
    const client = this.clientRepository.create(dto);
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      handleTypeOrmError(error); // tratamento genérico de erros do TypeORM
    }
  }

  // lista todos os clientes
  async findAll() {
    return this.clientRepository.find({ relations: ['users', 'demands'] });
  }

  // busca um cliente pelo ID
  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ where: { id }, relations: ['users', 'demands'] });
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  // atualiza um cliente
  async update(id: number, dto: UpdateClientDto) {
    const client = await this.findOne(id);
    const updated = this.clientRepository.merge(client, dto);

    try {
      return await this.clientRepository.save(updated);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  // remove um cliente
  async remove(id: number) {
    const client = await this.findOne(id);
    return this.clientRepository.remove(client);
  }
}