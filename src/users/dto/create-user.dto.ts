import { IsString, IsEmail, MaxLength, IsBoolean, IsOptional, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MaxLength(150)
  name: string; // nome do usuário

  @IsEmail()
  email: string; // e-mail do usuário

  @IsString()
  password: string; // senha do usuário (hash)

  @IsOptional()
  @IsBoolean()
  active?: boolean; // indica se o usuário está ativo

  @IsOptional()
  @IsBoolean()
  isManager?: boolean; // indica se o usuário é gestor

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  clients?: number[]; // IDs dos clientes vinculados
}