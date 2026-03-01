import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandDto } from './create-demand.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateDemandDto extends PartialType(CreateDemandDto) {
  @IsInt()
  @IsOptional()
  userId?: number;

  // clientId REMOVIDO
}