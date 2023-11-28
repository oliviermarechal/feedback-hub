import { NestFactory } from '@nestjs/core';
import { AppModule } from './adapters/primary/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import AppConfig from './app.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
    );

    await app.listen(AppConfig.port || 3000);
}

bootstrap();
