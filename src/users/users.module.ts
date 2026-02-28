import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ClientEntity]), ClientsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}