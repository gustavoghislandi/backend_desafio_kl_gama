import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(dto: CreateClientDto) {
    const client = this.clientRepository.create(dto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: number, dto: UpdateClientDto) {
  const client = await this.findOne(id);

  const updated = this.clientRepository.merge(client, dto);

  return this.clientRepository.save(updated);
}

  async remove(id: number) {
    const client = await this.findOne(id);
    return await this.clientRepository.remove(client);
  }

}