import * as argon2 from 'argon2';
import { EncrypterInterface } from '../../../hexagon/gateways/encrypter';

export class Argon2Encrypter implements EncrypterInterface {
    async encryptPassword(password: string): Promise<string> {
        return argon2.hash(password);
    }

    async compare(hash: string, plainPassword: string): Promise<boolean> {
        return argon2.verify(hash, plainPassword);
    }
}
