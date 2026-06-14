export interface IDeleteProfileImageUseCase {
  execute(userId: string): Promise<void>;
}
