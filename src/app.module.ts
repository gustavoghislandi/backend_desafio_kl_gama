import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { DemandsModule } from './demands/demands.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ClientsModule, DemandsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
