import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcryptjs from 'bcryptjs'


@Injectable()
export class PasswordHelper {
  private readonly saltRounds: number = 10
  hashPassword(password: string): string {
    return bcryptjs.hashSync(password, this.saltRounds)
  }
  comparePassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash)
  }
}
