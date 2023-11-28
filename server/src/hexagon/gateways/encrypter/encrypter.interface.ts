export interface EncrypterInterface {
    encryptPassword(password: string): Promise<string>;
    compare(hash: string, plainPassword: string): Promise<boolean>;
}

export const EncrypterInterface = Symbol('EncrypterInterface');
