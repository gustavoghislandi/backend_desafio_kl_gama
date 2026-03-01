import { Expose } from 'class-transformer';

export class ClientResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  active: boolean;
}