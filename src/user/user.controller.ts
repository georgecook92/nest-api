import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  fetchAll(): Promise<User[]> {
    return this.userService.fetchAll()
  }

  @Get(':id')
  fetchOne(@Param('id') id): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user)
  }
}
