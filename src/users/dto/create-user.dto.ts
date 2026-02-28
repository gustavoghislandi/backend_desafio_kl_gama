import { IsBoolean, IsOptional, IsString, MaxLength, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(150)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsBoolean()
  gestor?: boolean;

  @IsNumber()
  client_id: number;
}