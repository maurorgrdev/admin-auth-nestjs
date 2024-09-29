import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra a entidade User no TypeORM
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Opcional, exporta o serviço para outros módulos que precisem dele
})
export class UserModule {}
