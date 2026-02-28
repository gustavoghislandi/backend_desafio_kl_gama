import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientEntity } from '../clients/entities/client.entity';
import { handleTypeOrmError } from '../common/utils/typeorm-error.util';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // cria um novo usuário
  async create(dto: CreateUserDto) {
    // busca os clientes vinculados
    const clients = dto.clients?.length
      ? await this.clientRepository.find({ where: { id: In(dto.clients) } })
      : [];

    const user = this.userRepository.create({ ...dto, clients });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      handleTypeOrmError(error); // tratamento genérico de erros do TypeORM
    }
  }

  // lista todos os usuários
  async findAll() {
    return this.userRepository.find({ relations: ['clients', 'managedUsers', 'demands'] });
  }

  // busca um usuário pelo ID
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['clients', 'managedUsers', 'demands'],
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  // atualiza um usuário
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    // atualiza os clientes vinculados, se houver
    if (dto.clients?.length) {
      const clients = await this.clientRepository.find({ where: { id: In(dto.clients) } });
      user.clients = clients;
    }

    // cria objeto parcial sem clients para merge
    const { clients: _, ...partialDto } = dto;

    const updated = this.userRepository.merge(user, partialDto);

    try {
      return await this.userRepository.save(updated);
    } catch (error) {
      handleTypeOrmError(error);
    }
  }

  // remove um usuário
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}