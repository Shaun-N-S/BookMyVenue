import { AuthProvider } from '@domain/enums/AuthProvider';

export interface CreateUserEntityDTO {
  fullName: string;
  email: string;
  authProvider: AuthProvider;
  phone?: string;
  password?: string;
  googleId?: string;
  profileImage?: string;
}
