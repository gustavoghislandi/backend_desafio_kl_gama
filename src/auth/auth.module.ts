import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthClientController } from './client/auth-client.controller';
import { AuthClientService } from './client/auth-client.service';
import { ClientsModule } from '../clients/clients.module';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    ClientsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthClientController],
  providers: [AuthClientService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}