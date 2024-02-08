import { Module } from '@nestjs/common';
import { AppProviders } from './providers/app.providers';
import { JwtModule } from '@nestjs/jwt';
import { Controllers } from './controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
        }),
    ],
    controllers: [...Controllers],
    providers: [...AppProviders],
})
export class AppModule {}
