import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
}
