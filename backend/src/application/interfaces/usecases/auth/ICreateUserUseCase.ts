import { CreateUserEntityDTO } from '@application/dto/auth/CreateUserDTO';

export interface ICreateUserUseCase {
  createUser(user: CreateUserEntityDTO): Promise<void>;
}
