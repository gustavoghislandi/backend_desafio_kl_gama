import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateDemandDto {

  @IsString()
  description: string; // descrição da demanda

  @IsDateString()
  createdAt: string; // data de cadastro

  @IsOptional()
  @IsDateString()
  dueDate?: string; // data de vencimento

  @IsInt()
  userId: number; // ID do usuário responsável pela demanda

  @IsInt()
  clientId: number; // ID do cliente ao qual a demanda pertence
}