import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      select: ['id', 'name', 'email'],
      where: { id },
      relations: {
        articles: true,
      },
    });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
