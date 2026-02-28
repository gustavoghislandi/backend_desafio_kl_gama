import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class CreateClientDto {

  @IsString()
  @MaxLength(150)
  name: string; // nome do cliente

  @IsOptional()
  @IsBoolean()
  active?: boolean; // indica se está ativo
}