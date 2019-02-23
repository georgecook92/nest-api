import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

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
}
