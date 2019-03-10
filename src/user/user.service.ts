import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }
  create(user: CreateUserDTO): Promise<User> {
    return this.userRepository.save(user)
  }
}
