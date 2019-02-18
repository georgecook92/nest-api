import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  fetchAll(): string {
    return this.userService.fetchAll()
  }

  @Get(':id')
  fetchOne(@Param('id') id): string {
    return this.userService.fetchOne(id)
  }
}
