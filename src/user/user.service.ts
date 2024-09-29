import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ResponseUserDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './domain/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        this.logger.log('Start user creation process')

        try {
            const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });

            if (existingUser) {
                this.logger.warn(`Email ${createUserDto.email} is already in use`);

                throw new HttpException('Email alredy in use', HttpStatus.BAD_REQUEST);
            }

            this.logger.log('Creating new user in the database');
            const newUser = this.userRepository.create(createUserDto);
            const savedUser = await this.userRepository.save(newUser);

            this.logger.log(`User with email ${createUserDto.email} created successfully`);

            return plainToInstance(ResponseUserDto, savedUser);
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.error(`Error creating user: ${error.message}`);

                throw new HttpException('Error creating user. Please check the provided data.', HttpStatus.BAD_REQUEST);
            }
        }

    }
}
