import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientsService } from '../../clients/clients.service'
import { ClientLoginDto } from './dto/client-login.dto';
import { ClientLoginResponseDto } from './dto/client-login-response.dto';

@Injectable()
export class AuthClientService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: ClientLoginDto): Promise<ClientLoginResponseDto> {
    const client = await this.clientsService.findByEmail(dto.email);

    if (!client) throw new UnauthorizedException('Email ou senha inválidos');

    const isMatch = await bcrypt.compare(dto.password, client.password);
    if (!isMatch) throw new UnauthorizedException('Email ou senha inválidos');

    const payload = { sub: client.id }; // sub = clientId no token
    const token = this.jwtService.sign(payload);

    return {
      token,
      id: client.id,
      name: client.name,
      email: client.email,
    };
  }
}