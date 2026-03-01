import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { ClientResponseDto } from '../../clients/dto/client-response.dto';

export class DemandResponseDto {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  dueDate: Date;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  @Type(() => ClientResponseDto)
  client: ClientResponseDto;
}