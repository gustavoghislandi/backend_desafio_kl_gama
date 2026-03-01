import { Controller, Post, Body } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { ClientLoginDto } from './dto/client-login.dto';
import { ClientLoginResponseDto } from './dto/client-login-response.dto';

@Controller('auth/client')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('login')
  async login(@Body() dto: ClientLoginDto): Promise<ClientLoginResponseDto> {
    return this.authClientService.login(dto);
  }
}