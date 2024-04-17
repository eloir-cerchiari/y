import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getHello(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getUserById(parseInt(id));
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = createUser.name;
    user.email = createUser.email;
    const userResponse = await this.userService.createUser(user);
    delete userResponse.isActive;
    return userResponse;
  }
}

export type CreateUserDto = {
  name: string;
  email: string;
};
