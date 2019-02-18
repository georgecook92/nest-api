import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  fetchAll(): string {
    return 'All';
  }
  fetchOne(id: string): string {
    return id;
  }
}
