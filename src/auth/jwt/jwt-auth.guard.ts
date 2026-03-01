import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const [, token] = authHeader.split(' ');

    try {
      const payload = this.jwtService.verify(token);
      request['client'] = { id: payload.sub }; // salva clientId no request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}