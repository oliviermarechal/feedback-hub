import { Module } from '@nestjs/common';
import { AppProviders } from './providers/app.providers';
import { JwtModule } from '@nestjs/jwt';
import { Controllers } from './controller';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
        }),
    ],
    controllers: [...Controllers],
    providers: [...AppProviders],
})
export class AppModule {}
