import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Mauro',
    description: 'The first name of the user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Lima',
    description: 'The last name of the user',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'mauro@lima.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678901',
    description: 'The CPF of the user, must be 11 digits',
  })
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    example: null,
    description: 'The ID of the user group, can be null if no group is assigned',
    nullable: true,
  })
  @IsOptional()
  grupo_id?: string;
}
