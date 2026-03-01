import { IsString, IsNotEmpty, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateDemandDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsInt()
  @IsOptional() // cliente pode não enviar; admin envia
  userId?: number;

  // clientId REMOVIDO
}