import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { CreateUserDTO } from './create-user.dto';
import { LoginDTO } from './login.dto';
import { User } from 'src/user/user.entity';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  fetchAll(): Promise<User[]> {
    return this.authService.fetchAll()
  }

  @Get(':id')
  fetchOne(@Param('id') id): Promise<User> {
    return this.authService.findById(id)
  }

  @Post('register')
  create(@Body() user: CreateUserDTO): Promise<User> {
     return this.authService.create(user)
  }

  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<{ token: string }> {
     const user: User = await this.authService.login(dto)
     const token = this.jwtService.sign({ email: user.email })
     return { token }
  }
}
