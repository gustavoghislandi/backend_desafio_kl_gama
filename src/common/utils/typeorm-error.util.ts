import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

export function handleTypeOrmError(error: unknown) {
  if (error instanceof QueryFailedError) {
    // UNIQUE violation Postgres
    if (error.driverError?.code === '23505') {
      throw new ConflictException('Email já cadastrado em outro usuário'); // 409
    }
  }
  throw error; // outros erros sobem normalmente
}