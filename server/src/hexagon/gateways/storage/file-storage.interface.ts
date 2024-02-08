export interface FileStorageInterface {
    uploadFile(file: Express.Multer.File): Promise<string>;
}

export const FileStorageInterface = Symbol('FileStorageInterface');
