import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '12345678901',
    description: 'The CPF of the user, must be 11 digits',
    required: false,
  })
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    example: null,
    description: 'The ID of the user group, can be null if no group is assigned',
    required: false,
    nullable: true,
  })
  @IsOptional()
  grupo_id?: string;
}
