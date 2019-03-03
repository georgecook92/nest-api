import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';
import { CreateUserDTO } from 'src/auth/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


  fetchAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  findById(id: string): Promise<User> {
    return this.userRepository.findOne(id)
  }
  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }
  create(user: CreateUserDTO): Promise<User> {
    return this.userRepository.save(user)
  }
}
