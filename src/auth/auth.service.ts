import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDTO } from './login.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {}
  
  private readonly saltRounds: number = 10

  fetchAll(): Promise<User[]> {
    return this.userService.fetchAll()
  }
  findById(id: string): Promise<User> {
    return this.userService.findById(id)
  }
  findByEmail(email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }
  create(user: CreateUserDTO): Promise<User> {
    return this.userService.create({
      ...user,
      password: this.hashPassword(user.password)
    })
  }
  async login(dto: LoginDTO): Promise<User> {
    const user: User = await this.userService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException()
    const match = this.comparePassword(
      dto.password,
      user.password
    )
    if (!match) throw new UnauthorizedException()
    return user
    
  }
  hashPassword(password: string): string {
    return bcryptjs.hashSync(password, this.saltRounds)
  }
  comparePassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash)
  }
}
