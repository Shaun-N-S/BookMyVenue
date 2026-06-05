export interface IStorageService {
  upload(file: Buffer, folder: string): Promise<string>;

  delete(publicId: string): Promise<void>;
}
