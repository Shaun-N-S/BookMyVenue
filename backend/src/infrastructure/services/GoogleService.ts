import { CreateUserEntityDTO } from '@application/dto/auth/CreateUserDTO';
import { IGoogleService } from '@application/interfaces/services/IGoogleService';
import { AuthProvider } from '@domain/enums/AuthProvider';
import { OAuth2Client } from 'google-auth-library';

export class GoogleService implements IGoogleService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async verifyToken(idToken: string): Promise<CreateUserEntityDTO> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid Google token');
    }

    return {
      email: payload.email!,
      fullName: payload.name!,
      profileImage: payload.picture!,
      authProvider: AuthProvider.GOOGLE,
      googleId: payload.sub,
    };
  }
}
