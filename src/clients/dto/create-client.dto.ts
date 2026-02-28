import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClientDto {

  @IsString()
  @MaxLength(150)
  nome: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

}