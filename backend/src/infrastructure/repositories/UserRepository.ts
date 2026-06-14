import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { userMapper } from '@application/mappers/UserMapper';
import { User } from '@domain/entities/user';
import { IUserModel, userModel } from '@infrastructure/database/models/userModel';

import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<User, IUserModel> implements IUserRepository {
  constructor() {
    super(userModel, userMapper);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email });

    return user ? userMapper.fromMongooseDocument(user) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await userModel.findOne({ phone });

    return user ? userMapper.fromMongooseDocument(user) : null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const user = await userModel.findOne({ googleId });

    return user ? userMapper.fromMongooseDocument(user) : null;
  }

  async updateProfileImage(userId: string, profileImage: string | undefined): Promise<void> {
    await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          profileImage,
        },
      },
      {
        new: false,
        runValidators: true,
      },
    );
  }
}
