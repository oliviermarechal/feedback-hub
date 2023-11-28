export interface JwtTokenGeneratorInterface {
    generate(payload: object): Promise<string>;
}

export const JwtTokenGeneratorInterface = Symbol('JwtTokenGeneratorInterface');
