import bcrypt from 'bcrypt';

import { IPasswordHasher } from '@application/interfaces/services/IPasswordHasher';

export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
