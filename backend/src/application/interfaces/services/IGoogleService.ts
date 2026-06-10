import { CreateUserEntityDTO } from '@application/dto/auth/CreateUserDTO';

export interface GoogleUserPayload {
  email: string;
  name: string;
  picture: string;
}

export interface IGoogleService {
  verifyToken(idToken: string): Promise<CreateUserEntityDTO>;
}
