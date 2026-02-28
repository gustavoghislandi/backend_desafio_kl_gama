import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ){}

    async create(nome: string) {
        const client = this.clientRepository.create({ nome });
        return await this.clientRepository.save(client);
    }
}
