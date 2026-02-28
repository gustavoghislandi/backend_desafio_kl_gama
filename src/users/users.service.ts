import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientsService } from '../clients/clients.service';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly clientsService: ClientsService,
  ) {}

  async create(dto: CreateUserDto) {
    const client = await this.clientsService.findOne(dto.client_id);
    const user = this.userRepository.create({ ...dto, client });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  async findAll() {
    return this.userRepository.find({ relations: ['client'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['client'] });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.client_id) {
      const client = await this.clientsService.findOne(dto.client_id);
      user.client = client;
    }

    const updated = this.userRepository.merge(user, dto);

    try {
      return await this.userRepository.save(updated);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}