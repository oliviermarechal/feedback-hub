import { User } from '../../model';

export interface UserRepositoryInterface {
    save(user: User): Promise<User>;
    find(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}

export const UserRepositoryInterface = Symbol('UserRepositoryInterface');
