import { JwtTokenGeneratorInterface } from '../../../hexagon/gateways/generator';
import { JwtService } from '@nestjs/jwt';

export class JwtTokenGenerator implements JwtTokenGeneratorInterface {
    constructor(private readonly jwtService: JwtService) {}

    async generate(payload: object): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '7d',
        });
    }
}
