import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';
import { LoginDTO } from './login.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  fetchAll(): Promise<User[]> {
    return this.userService.fetchAll()
  }

  @Get(':id')
  fetchOne(@Param('id') id): Promise<User> {
    return this.userService.findById(id)
  }

  @Post('register')
  create(@Body() user: CreateUserDTO): Promise<User> {
     return this.userService.create(user)
  }

  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<string> {
     const user: User = await this.userService.login(dto)
     return this.jwtService.sign(user)
  }
}
