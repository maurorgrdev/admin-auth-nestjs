import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    example: 'ID',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: '12345678901',
    description: 'The CPF of the user',
  })
  cpf: string;

  @ApiProperty({
    example: null,
    description: 'The ID of the user group, if assigned',
    nullable: true,
  })
  grupo_id: string | null;
}
