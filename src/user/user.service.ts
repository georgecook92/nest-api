import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDTO } from './login.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
  private readonly saltRounds: number = 10

  fetchAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  findById(id: string): Promise<User> {
    return this.userRepository.findOne(id)
  }
  create(user: CreateUserDTO): Promise<User> {
    return this.userRepository.save({
      ...user,
      password: this.hashPassword(user.password)
    })
  }
  async login(dto: LoginDTO): Promise<User> {
    const user: User = await this.userRepository.findOne({ email: dto.email })
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
