export interface IUploadProfileImageUseCase {
  execute(userId: string, profileImage: Express.Multer.File): Promise<void>;
}
