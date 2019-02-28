import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';
import * as bcryptjs from 'bcryptjs'


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
  hashPassword(password: string): string {
    return bcryptjs.hashSync(password, this.saltRounds)
  }
}
