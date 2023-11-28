export interface UserProps {
    id: string;
    email: string;
    password: string;
}

export class User {
    id: string;
    email: string;
    password: string;

    static create(userProps: UserProps): User {
        const user = new User();
        user.id = userProps.id;
        user.email = userProps.email;
        user.password = userProps.password;

        return user;
    }

    withoutPassword(): Partial<User> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...partial } = this;

        return partial;
    }
}
