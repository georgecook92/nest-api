import { Controller, Get, Param, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDTO } from './create-user.dto';
import { LoginDTO } from './login.dto';
import { User } from 'src/user/user.entity';
import { PasswordHelper } from 'src/util/PasswordHelper';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHelper: PasswordHelper
  ) {}

  @Post('register')
  create(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.create({
      ...user,
      password: this.passwordHelper.hashPassword(user.password)
    })
  }

  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<{ token: string }> {
    const user: User = await this.userService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException()
    const match = this.passwordHelper.comparePassword(
      dto.password,
      user.password
    )
    if (!match) throw new UnauthorizedException()
     const token = this.jwtService.sign({ email: user.email })
     return { token }
  }
}
