import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto'; 
import { ResponseUserDto } from 'src/user/dto/response-user.dto'; 
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/domain/user.entity'; 
import { plainToInstance } from 'class-transformer';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Mauro',
      last_name: 'Lima',
      email: 'mauro@lima.com',
      cpf: '40028922000',
      grupo_id: null,
    };

    const savedUser = {
      id: 'generated-id',
      ...createUserDto,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // Simula que o e-mail não está em uso
    jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser as User); // Simula o salvamento do usuário

    const result: ResponseUserDto = await service.createUser(createUserDto);

    expect(result).toEqual(plainToInstance(ResponseUserDto, savedUser));
  });

  it('should throw an error when email is already in use', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Mauro',
      last_name: 'Lima',
      email: 'mauro@lima.com',
      cpf: '40028922000',
      grupo_id: null,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(createUserDto as User); // Simula que o e-mail já está em uso

    await expect(service.createUser(createUserDto)).rejects.toThrow('Email already in use');
  });
});
