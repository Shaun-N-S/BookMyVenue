import { IOtpService } from '@application/interfaces/services/IOtpService';

export class OtpService implements IOtpService {
  generateOtp(length = 6): string {
    let otp = '';

    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  }
}
