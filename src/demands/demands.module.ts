import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandsService } from './demands.service';
import { DemandsController } from './demands.controller';
import { DemandEntity } from './entities/demand.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ClientEntity } from '../clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemandEntity, UserEntity, ClientEntity]),
  ],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}